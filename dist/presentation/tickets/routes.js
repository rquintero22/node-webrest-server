"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class TicketRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.TicketController();
        router.get('/', controller.getTickets);
        router.get('/last', controller.getLastTicketNumber);
        router.get('/pending', controller.pendingTickets);
        router.post('/', controller.createTicket);
        router.get('/draw/:desk', controller.drawTicket);
        router.put('/done/:ticketId', controller.ticketFinished);
        router.get('/working-on', controller.workingOn);
        return router;
    }
}
exports.TicketRoutes = TicketRoutes;
