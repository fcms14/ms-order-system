import {
  ORDER_CREATED, ORDER_STOCK_RESERVED, ORDER_STOCK_FAILED, ORDER_FAILED_PAYMENT,
  ORDER_NEW, ORDER_PAYMENT_PENDING, ORDER_PAYMENT_FAILED, ORDER_PAID, ORDER_REVIEWED,
  ORDER_FRAIGHT_CALCULATED, ORDER_PRINTED, ORDER_ISSUED, ORDER_ALLOCATED, ORDER_REFUNDED,
  ORDER_READY, ORDER_DISPATCHED, ORDER_DELIVERED, ORDER_REVIEW_REQUESTED, ORDER_FRAIGHT_FAILED
} from './rmq.events';

const validTransitions = {
  [ORDER_CREATED]: [ORDER_STOCK_RESERVED, ORDER_STOCK_FAILED],
  [ORDER_STOCK_RESERVED]: [ORDER_FRAIGHT_CALCULATED],
  [ORDER_FRAIGHT_CALCULATED]: [ORDER_NEW],
  [ORDER_NEW]: [ORDER_PAYMENT_PENDING],
  [ORDER_PAYMENT_PENDING]: [ORDER_PAID, ORDER_PAYMENT_FAILED],
  [ORDER_PAID]: [ORDER_ALLOCATED, ORDER_PRINTED, ORDER_ISSUED],
  [ORDER_ALLOCATED]: [ORDER_READY],
  [ORDER_READY]: [ORDER_DISPATCHED],
  [ORDER_DISPATCHED]: [ORDER_DELIVERED],
  [ORDER_DELIVERED]: [ORDER_REVIEW_REQUESTED],
};

export function validateEventTransition(currentEvent: string, nextEvent: string): boolean {
  return validTransitions[currentEvent]?.includes(nextEvent) ?? false;
}

export function ensureValidTransition(currentEvent: string, nextEvent: string) {
  if (!validateEventTransition(currentEvent, nextEvent)) {
    throw new Error(`❌ Transição de estado inválida: ${currentEvent} → ${nextEvent}`);
  }
}
