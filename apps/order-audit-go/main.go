package main

import (
	"log"
	"os"

	"github.com/streadway/amqp"
)

// Nome da Exchange (definida na lib rmq)
const exchangeName = "order-events-exchange"

func main() {
	rabbitMqUrl := os.Getenv("RABBITMQ_URI")
	if rabbitMqUrl == "" {
		rabbitMqUrl = "amqp://rabbitmq:5672"
	}

	// Conecta ao RabbitMQ
	conn, err := amqp.Dial(rabbitMqUrl)
	if err != nil {
		log.Fatalf("❌ Failed to connect to RabbitMQ: %v", err)
	}
	defer conn.Close()

	// Cria o canal
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("❌ Failed to open a channel: %v", err)
	}
	defer ch.Close()

	// Declara a Exchange (fanout)
	err = ch.ExchangeDeclare(
		exchangeName, // Nome da Exchange
		"fanout",     // Tipo
		true,         // Durável
		false,        // Auto-delete
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("❌ Failed to declare an exchange: %v", err)
	}

	// Cria uma fila temporária (auto-delete)
	q, err := ch.QueueDeclare(
		"",    // Nome vazio = fila exclusiva e auto-delete
		false, // Durável
		true,  // Auto-delete
		true,  // Exclusivo
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("❌ Failed to declare a queue: %v", err)
	}

	// Liga a fila à Exchange (fanout)
	err = ch.QueueBind(
		q.Name,       // Nome da fila
		"",           // Routing Key (em fanout é ignorado)
		exchangeName, // Nome da Exchange
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("❌ Failed to bind a queue: %v", err)
	}

	// Consome as mensagens
	msgs, err := ch.Consume(
		q.Name, // Nome da fila
		"",     // Nome do consumidor
		true,   // Auto-Ack
		false,  // Exclusivo
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("❌ Failed to register a consumer: %v", err)
	}

	log.Println("✅ Waiting for messages...")

	// Lê mensagens em uma goroutine
	go func() {
		for msg := range msgs {
			log.Printf("📥 Received a message: %s", msg.Body)
		}
	}()

	// Mantém o serviço rodando
	select {}
}
