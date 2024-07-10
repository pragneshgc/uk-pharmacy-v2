<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Crypt;

class SafeIPMail extends Mailable
{
    use Queueable, SerializesModels;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(public string $name, public string $ip, public string $token, public string $by, public $safeip_audit)
    {
        $this->subject = 'Safe IP Email';
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
            ->subject($this->subject)->view('email.safeip')->with(
                [
                    'name' => $this->name,
                    'ip' => $this->ip,
                    'token' => $this->token,
                    'by' => Crypt::encryptString($this->by),
                    'action_id' => $this->safeip_audit->id
                ]
            );
    }
}
