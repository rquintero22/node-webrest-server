"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
class TicketController {
    constructor() {
        this.getTickets = (req, res) => {
            res.json('getTickets');
        };
        this.getLastTicketNumber = (req, res) => {
            res.json('getLastTicketNumber');
        };
        this.pendingTickets = (req, res) => {
            res.json('pendingTickets');
        };
        this.createTicket = (req, res) => {
            res.json('createTicket');
        };
        this.drawTicket = (req, res) => {
            res.json('drawTicket');
        };
        this.ticketFinished = (req, res) => {
            res.json('ticketFinished');
        };
        this.workingOn = (req, res) => {
            res.json('workingOn');
        };
    }
}
exports.TicketController = TicketController;
