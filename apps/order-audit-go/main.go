package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofrs/uuid"
	"github.com/streadway/amqp"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Nome da Exchange (definida na lib rmq)
const exchangeName = "order-events-exchange"

type Log struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Message   JSONB     `gorm:"type:jsonb;not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}

type JSONB map[string]interface{}

func (j JSONB) GormDataType() string {
	return "jsonb"
}

func main() {
	pg_host := os.Getenv("POSTGRES_HOST")
	pg_user := os.Getenv("POSTGRES_USERNAME")
	pg_password := os.Getenv("POSTGRES_PASSWORD")
	pg_name := os.Getenv("ORDER_AUDIT_DATABASE")
	pg_port := os.Getenv("POSTGRES_PORT")	
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/Sao_Paulo", pg_host, pg_user, pg_password, pg_name, pg_port)
	fmt.Print(dsn)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Panic("Error connecting to the db")
	}

	//create table test
	query := `
	CREATE TABLE IF NOT EXISTS logs (
		id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
		message JSONB NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`
	if err := db.Exec(query).Error; err != nil {
		log.Fatal("Erro ao criar tabela:", err)
	}

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

	// Declarando o exchange como 'fanout'
	err = ch.ExchangeDeclare(
		"order-events-exchange", // Nome do exchange
		"fanout",                // Tipo do exchange (fanout)
		true,                    // Durável (o exchange não será perdido)
		false,                   // Não exclusivo
		false,                   // Não auto-deletável
		false,                   // Não esperar
		nil,                     // Parâmetros adicionais
	)
	if err != nil {
		log.Fatal("Falha ao declarar exchange:", err)
	}

	// Declarando a fila
	q, err := ch.QueueDeclare(
		"orders.stock", // Nome da fila
		false,          // Não durável
		false,          // Não auto-deletável
		false,          // Não exclusiva
		false,          // Não esperar
		nil,            // Sem parâmetros
	)
	if err != nil {
		log.Fatal("Falha ao declarar fila:", err)
	}

	// Vinculando a fila ao exchange (fanout não precisa de routing key)
	err = ch.QueueBind(
		q.Name,                  // Nome da fila
		"",                      // Sem chave de roteamento para 'fanout'
		"order-events-exchange", // Nome do exchange
		false,                   // Não esperar
		nil,                     // Sem parâmetros
	)
	if err != nil {
		log.Fatal("Falha ao vincular fila ao exchange:", err)
	}

	// Consumindo mensagens da fila
	msgs, err := ch.Consume(
		q.Name, // Nome da fila
		"",     // Consumidor
		true,   // Auto-acknowledge
		false,  // Não exclusivo
		false,  // Não bloquear a fila
		false,  // Não esperar
		nil,    // Sem parâmetros
	)
	if err != nil {
		log.Fatal("Falha ao registrar consumidor:", err)
	}
	log.Println("✅ Waiting for messages...")

	// Lê mensagens em uma goroutine
	go func() {
		for msg := range msgs {
			log.Printf("📥 Received a message: %s", msg.Body)

			var jsonData map[string]interface{}
			if err := json.Unmarshal(msg.Body, &jsonData); err != nil {
				log.Fatal("Error converting to json", err)
			}

			logEntry := Log{
				Message: jsonData,
			}

			if err := db.Create(&logEntry).Error; err != nil {
				log.Fatal("Error inserting log:", err)
			}
		}
	}()

	// Mantém o serviço rodando
	select {}
}
