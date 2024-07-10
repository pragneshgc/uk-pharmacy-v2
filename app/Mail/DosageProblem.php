<?php

namespace App\Mail;

use App\Library\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DosageProblem extends Mailable
{
    use Queueable, SerializesModels;

    public mixed $data;
    /**
     * Create a new message instance.
     *
     */
    public function __construct(int $id)
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
        return $this->view('email.dosageProblem');
    }
}