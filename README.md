## DEV SETUP

The project has following major dependencies:

-   PHP 8.2
-   Laravel 10.x
-   Vue 2.7
-   Node v18.8
-   npm 8.18

After pulling the project from the repository run `composer install` and `npm install`. That will setup all the necessary JS and PHP packages. For a detailed list of available npm scripts, check the package.json file.

.env.example file in the root directory of the projects needs to be copied (in the same folder .env.example is located in) and renamed .env

Make sure to fill out the .env file with the correct database credentials and other relevant information (depending on the host setup).

A blank mysql database to import and use is available in the following directory: /database/migrations/whitelabel.sql

You can generate an app key using `php artisan key:generate` command. Make sure to use the same key across all 3 applications (pharmacist, pharmacist-inventory, pharmacist-shipping).

## PRODUCTION SETUP

Only Composer is required to setup the project on a production server. After pulling the project from the repository it is necessary to run `composer install` and rename .env.example file as specified in the DEV SETUP. .env file might need to be adjusted to a different database setup depending on the project. Following that, the project should be up and running.

Make sure to run `npm run production` beforehand to generate the production ready JS and CSS files.

## PASSPORT

This will set up the passport keys for the application (if API functionality is needed)

```
php artisan passport:install
//create links in /storage/app
ln -s /home/sites/mwoldek/natcol/dev/xml/dev/error xml_error
ln -s /home/sites/mwoldek/natcol/dev/tml/docs pdf
ln -s /home/sites/mwoldek/natcol/xml xml
```

## .env file explanation

```
APP_NAME=''                     # name of the app (used in various places of the application)
APP_ENV=local                   # make sure to change to production when on production server (used across the application)
APP_KEY=                        # generated with php artisan key:generate command
APP_DEBUG=true                  # if you want to show error dumps on the page
APP_URL=https://esasys.test     # full url of the application
APP_VERSION=''                  # version of the application (used to autorefresh the app userside when new version is available)
APP_SHIPPING='https://'         # url of the shipping app
APP_INVENTORY='https://'        # url of the inventory app

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=public
SESSION_DRIVER=database
SESSION_COOKIE=''               # name of the session cookie
SESSION_DOMAIN=''               # top domain of the session (should look like this: .application.domain)
SESSION_LIFETIME=120
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# make sure to fill out the mail credentials for mailing to work (pharmacist queries, safe ip emails, invoice emails, etc.)
MAIL_DRIVER=smtp
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

WKHTML_PDF_BINARY=''
WKHTML_IMG_BINARY=''

# access credentials for the ftp server used by JVM where prescriptions can be uploaded
FTP_HOST=
FTP_USER=
FTP_PASS=

# IMPORTANT! headless chrome is used to generate some PDF files (prescriptions, invoices)
CHROME_PATH=""
```
