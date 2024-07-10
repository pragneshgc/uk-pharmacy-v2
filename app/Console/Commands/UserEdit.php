<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserEdit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:edit';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Edit an inventory users information (name, surname, email, password)';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $confirm = false;
        $value = $this->ask('Type in either the name, surname, email, ESA ID OR Inventory ID:');

        $users = DB::table('PharmacyUser')->where('id', 'LIKE', "%$value%")->orWhere('esa_user_id', 'LIKE', "%$value%")
            ->orWhere('name', 'LIKE', "%$value%")
            ->orWhere('surname', 'LIKE', "%$value%")->orWhere('email', 'LIKE', "%$value%")->get();

        foreach ($users as $user) {
            $headers = ['Name', 'Surname', 'Email', 'ESA User ID', 'Inventory User ID'];

            $data = [
                [
                    'Name' => $user->name,
                    'Surname' => $user->surname,
                    'Email' => $user->email,
                    'ESA User ID' => $user->esa_user_id,
                    'Inventory User ID' => $user->id,
                ],
            ];

            $this->table($headers, $data);
            $confirm = $this->confirm('Is this the user you are looking for?');

            if ($confirm)
                break;
        }

        if (!$confirm) {
            $this->error('Could not find the user. Please try another search.');
            $this->handle();
            die();
        }

        /* if($user->email == 'tposcic@gmail.com' || $user->email ==  'woldekirstos@gmail.com'){
        $this->comment('What did you manage to break?');
        } */

        $property = $this->choice(
            'What property would you like to change?',
            ['password', 'name', 'surname', 'email']
        );

        if ($property == 'password') {
            $newValue = Hash::make($this->passwordInput());
        } else {
            $newValue = $this->ask("Enter the value for $property:");
        }

        $update = DB::table('PharmacyUser')->where('id', $user->id)->update([$property => $newValue]);
        //$update = false;
        if ($update) {
            $this->info('Update successfull!');
        } else {
            $this->info('Value unchanged. No updates made.');
        }

        if ($this->confirm('Do you want to edit another user?')) {
            $this->handle();
            die();
        }
    }

    private function passwordInput()
    {
        $val = $this->secret('Please enter the new password:');

        $uppercase = preg_match('@[A-Z]@', $val);
        $lowercase = preg_match('@[a-z]@', $val);
        $number = preg_match('@[0-9]@', $val);

        if (!$uppercase || !$lowercase || !$number || strlen($val) < 8) {
            if ($this->confirm('This password is not very secure. Do you want to continue?')) {
                return $val;
            } else {
                $this->passwordInput();
            }
        }

        return $val;
    }
}