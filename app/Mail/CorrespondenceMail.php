<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class CorrespondenceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    /**
     * Create a new message instance.
     * @param array<string, mixed> $option
     */
    public function __construct(public mixed $input, public array $option, public mixed $order)
    {
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $viewName = '';

        switch ($this->option['value']) {
            case '1':
                $viewName = 'email.tooMany';
                $this->subject = $this->order->ReferenceNumber . " has ordered too many (" . $this->order->CountryName . ")";
                break;
            case '2':
                $viewName = 'email.dosageProblem';
                $this->subject = $this->order->ReferenceNumber . " dosage discrepancy (" . $this->order->CountryName . ")";
                break;
            case '3':
                $viewName = 'email.tooEarly';
                $this->subject = $this->order->ReferenceNumber . " has ordered too early (" . $this->order->CountryName . ")";
                break;
            case '4':
                $viewName = 'email.miscellaneous';
                $this->subject = $this->order->ReferenceNumber . " dosage discrepancy (" . $this->order->CountryName . ")";
                break;
            case '5':
                $viewName = 'email.dosageProblem';
                $this->subject = $this->order->ReferenceNumber . " dosage discrepancy (" . $this->order->CountryName . ")";
                break;
            case '6':
                $viewName = 'email.potentialNameDiscrepancy';
                $this->subject = $this->order->ReferenceNumber . " has name discrepancy (" . $this->order->CountryName . ")";
                break;
            default:
                return $this;
        }

        return $this->from('info@hrhealthcare.group', 'HR Healthcare Pharmacy')
            ->bcc('info@hrhealthcare.group', 'HR Healthcare Pharmacy')
            ->subject($this->subject)->view($viewName)->with(
                [
                    'order' => $this->order,
                    'input' => $this->input,
                    'option' => $this->option,
                    'subject' => $this->subject
                ]
            );
    }
}