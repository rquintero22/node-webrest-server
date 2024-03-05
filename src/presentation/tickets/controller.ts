import { Request, Response } from "express";

export class TicketController {
    constructor() {}


    public getTickets = (req: Request, res: Response) => {
        res.json('getTickets');
    }

    public getLastTicketNumber = (req: Request, res: Response) => {
        res.json('getLastTicketNumber');
    }

    public pendingTickets = (req: Request, res: Response) => {
        res.json('pendingTickets');
    }

    public createTicket = (req: Request, res: Response) => {
        res.json('createTicket');
    }

    public drawTicket = (req: Request, res: Response) => {
        res.json('drawTicket');
    }

    public ticketFinished = (req: Request, res: Response) => {
        res.json('ticketFinished');
    }

    public workingOn = (req: Request, res: Response) => {
        res.json('workingOn');
    }
}