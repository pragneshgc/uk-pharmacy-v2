<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class InvoiceEmail extends Mailable
{
    use Queueable, SerializesModels;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(private int $id, private string $toCompanyName, private string $fromCompanyName, private string $file)
    {
        $this->subject = "Invoice #$this->id for $this->toCompanyName from $this->fromCompanyName";
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@hrhealthcare.group', 'HR Healthcare Pharmacy')
            ->bcc('info@hrhealthcare.group', 'HR Healthcare Pharmacy')
            ->subject($this->subject)->view('email.invoice')->with(
                [
                    'id' => $this->id,
                    'toCompanyName' => $this->toCompanyName,
                    'fromCompanyName' => $this->fromCompanyName,
                ]
            )->attach($this->file, [
                'as' => "Invoice #$this->id.pdf",
                'mime' => 'application/pdf',
            ]);
    }
}