<?php

namespace App\Mail;

use App\Library\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public int $id;
    public mixed $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(int $id, public string $type)
    {
        $order = new Order;
        $this->data = $order->getOrderDetails($id);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        //send email depending on $this->type
        return $this->view('email.dosageProblem');
    }
}