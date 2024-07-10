<?php

use App\Http\Controllers\APIController;
use App\Http\Controllers\JVMController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\HelpController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TrayController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\SafeipController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\IpAuditController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\BlacklistController;
use App\Http\Controllers\ConditionController;
use App\Http\Controllers\FrequencyController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\CaptchaServiceController;
use App\Http\Controllers\DispensingDataController;
use Illuminate\Support\Facades\{App, Auth, Route};
use App\Http\Controllers\PasswordSecurityController;
use App\Http\Controllers\PrescriptionPoolController;
use App\Http\Controllers\AdditionalInformationController;


Route::post('/', [ImportController::class, 'importOrder']);
Route::get('/restricted', [LoginController::class, 'restricted'])->name('restricted');
Route::post('restricted-ip-mail', [LoginController::class, 'restrictedIpMail'])->name('restricted-ip-mail');

Route::get('/approve-safe-ip', [SafeipController::class, 'approve']);
Route::get('/reject-safe-ip', [SafeipController::class, 'reject']);

Route::get('/order/{id}/download', [OrderController::class, 'download']);

if (App::environment(['local', 'staging'])) {
    Route::get('/test-cio', [TestController::class, 'sendEmail']);
    Route::get('test-azure', [TestController::class, 'testAzure']);
    Route::get('/generate-xml', [TestController::class, 'generateXML']);
    Route::get('/generate-json', [TestController::class, 'generateJSON']);
    Route::get('testazure/{dir}/{path}', [TestController::class, 'testAzurePath']);
}

/* SAFE IP */
Route::get('/add-safe-ip', [LoginController::class, 'addSafeIP']);

Route::group(['middleware' => ['checkip']], function () {
    Auth::routes();

    //2fa routes
    Route::get('/2fa', [PasswordSecurityController::class, 'show2faForm']);
    Route::post('/generate2faSecret', [PasswordSecurityController::class, 'generate2faSecret'])->name('generate2faSecret');
    Route::post('/2fa', [PasswordSecurityController::class, 'enable2fa'])->name('enable2fa');
    Route::post('/disable2fa', [PasswordSecurityController::class, 'disable2fa'])->name('disable2fa');

    Route::group(['middleware' => ['2fa']], function () {
        Route::post('/verify-2fa', function () {
            return redirect(route('home'));
        })->name('2faVerify');
    });

    Route::get('/daily-stats', [HomeController::class, 'dailyStats']);
    Route::get('/daily-stats/data', [HomeController::class, 'dailyStatsData']);
    Route::post('/login/code', [LoginController::class, 'code'])->name('login_code');

    //might need to be moved
    Route::get('/prescription/{id}/view', [OrderController::class, 'viewPrescription']); //MOVE TO API
    Route::get('/prescription/{id}/view/html', [OrderController::class, 'viewPrescriptionHTML']); //MOVE TO API
    Route::get('/prescription/{id}/label', [OrderController::class, 'viewLabel']); //MOVE TO API
    Route::get('/prescription/{id}/id-label', [OrderController::class, 'viewIdLabel']); //MOVE TO API
    Route::get('/prescription/{id}/log-print', [OrderController::class, 'logDeliveryNotePrint']); //MOVE TO API

    Route::get('/doctors/{id}/signature', [DoctorController::class, 'signature']);
    Route::get('/invoice/{id}/preview', [InvoiceController::class, 'previewInvoice']); //MOVE TO API
    Route::get('/invoice/{id}/view', [InvoiceController::class, 'viewInvoice']); //MOVE TO API
    Route::get('/invoices/generate/{id}', [InvoiceController::class, 'generateInvoice']); //MOVE TO API
});

Route::group(['middleware' => ['auth', 'auth.session', 'xssSanitizer']], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('2fa');

    Route::group(['middleware' => ['routesafetycheck']], function () {
        Route::get('/statistics', [HomeController::class, 'statistics']);
        Route::get('/statistics-cached', [HomeController::class, 'statisticsCached']);
        Route::get('/countries', [HomeController::class, 'countries']);
        Route::get('/doctors', [HomeController::class, 'doctors']);
        Route::get('/products', [HomeController::class, 'products']);
        Route::get('/clients', [HomeController::class, 'clients']);
        Route::get('/delivery-companies', [HomeController::class, 'deliveryCompanies']);
        Route::get('/user-roles', [RoleController::class, 'getPharmacyRoles']);

        //Orders
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/orders/duplicate/{referenceNumber}', [OrderController::class, 'duplicate']);
        Route::get('/orders/search', [OrderController::class, 'search']);
        Route::get('/orders/register', [OrderController::class, 'register']);
        Route::get('/orders/on-hold-postponed', [OrderController::class, 'onHoldPostponed']);
        Route::get('/orders/csv', [OrderController::class, 'csv']);
        Route::get('/orders/csv/dashboard', [OrderController::class, 'csv']);
        Route::get('/orders/csv/register', [OrderController::class, 'csvRegister']);
        Route::get('/orders/ids', [OrderController::class, 'getIds']);
        Route::get('/order/{id}', [OrderController::class, 'details']);
        Route::get('/order/{id}/test-kits', [OrderController::class, 'testKits']);
        Route::get('/order/{id}/access-point', [OrderController::class, 'getUPSAccessPointDetails']);
        Route::get('/order/{id}/activity', [OrderController::class, 'getActivity']);
        Route::get('/order/{id}/history', [OrderController::class, 'orderHistory']);
        Route::get('/order/{id}/history-new', [OrderController::class, 'orderHistoryNew']);
        Route::post('/order/{id}/cancel', [OrderController::class, 'cancel']);
        Route::post('/order/{id}/resend', [OrderController::class, 'resend']);
        Route::post('/order/{id}/resend-tracking', [OrderController::class, 'resendTracking']);
        Route::post('/order/{id}/redeliver', [OrderController::class, 'redeliver']);
        Route::post('/order/{id}/add-tracking', [OrderController::class, 'addTracking']);
        Route::get('/order/{id}/email', [OrderController::class, 'getEmail']);
        Route::get('/order/{id}/download-file', [DownloadController::class, 'downloadFile']);
        Route::get('/order/{id}/approved', [OrderController::class, 'orderPreApproved']);
        Route::get('/order/{referenceNumber}/exists', [OrderController::class, 'exists']);
        Route::get('/orders/count/status/{status}', [OrderController::class, 'getCountWithStatus']);
        Route::post('/order/attached-products', [OrderController::class, 'getAttachedProducts']);
        Route::get('/orders/conditions', [ConditionController::class, 'index']);
        Route::get('/orders/frequencies', [FrequencyController::class, 'index']);

        // -----------------Print Related-----------------------------
        Route::get('/order/{id}/view', [OrderController::class, 'view']);
        Route::get('/order/{id}/label', [OrderController::class, 'label']);
        Route::get('/order/{id}/id-label', [OrderController::class, 'idLabel']);
        // -----------------------------------------------------------
        Route::get('/order/{id}/statuses', [OrderController::class, 'orderCheck']);
        Route::get('/questionnaire/{id}', [QuestionnaireController::class, 'index']);
        Route::get('/order/reference/{referenceNo}', [OrderController::class, 'getOrderID']);
        Route::get('/order/{id}/print-record', [OrderController::class, 'printRecord']);
        Route::get('/order/{id}/print-details', [OrderController::class, 'printDetails']);

        Route::get('/test/mail', [OrderController::class, 'mailtest']);

        //Note
        Route::get('/note/pending-alerts', [NoteController::class, 'pendingAlerts']);
        Route::get('/order/{id}/notes', [NoteController::class, 'prescription']);
        Route::post('/note', [NoteController::class, 'create']);
        Route::post('/note/{id}/delete', [NoteController::class, 'delete']);
        Route::patch('/note/{id}', [NoteController::class, 'update']);

        //Dashboard
        Route::get('/dashboard/alerts-count', [HomeController::class, 'alertsCount']);

        //Order editing
        Route::get('/order-edit/{id}', [OrderController::class, 'editAddress']);
        Route::post('/order-edit/{id}', [OrderController::class, 'updateOrder']);
        Route::post('/order-edit/{id}/delivery-company', [OrderController::class, 'getDeliveryCompany']);
        Route::post('/order-edit/{id}/postcode-formatting', [OrderController::class, 'getPostcodeFormatting']);
        Route::post('/order-edit/check/{id}', [OrderController::class, 'checkUpdateDetail']);
        Route::post('/order-edit/{id}/status', [OrderController::class, 'updateStatus']);
        Route::post('/order-edit/revert/{id}', [OrderController::class, 'revertOrderUpdate']);

        //Tray
        Route::get('/tray', [TrayController::class, 'index']);
        Route::get('/tray/{id}', [TrayController::class, 'index']);
        Route::post('/tray', [TrayController::class, 'insert']);
        Route::post('/tray/{id}/takeover', [TrayController::class, 'takeover']);
        Route::patch('/tray/{id}', [TrayController::class, 'update']);
        Route::patch('/tray/{id}/lower-priority', [TrayController::class, 'lowerPriority']);
        Route::delete('/tray/clear', [TrayController::class, 'clear']);
        Route::delete('/tray/clear/{id}', [TrayController::class, 'clear']);
        Route::delete('/tray/{id}', [TrayController::class, 'delete']);
        Route::get('/tray/{id}/check', [TrayController::class, 'check']);
        Route::post('/tray/new/insert', [TrayController::class, 'insertAllNew']);
        Route::post('/tray/new/insert/{count}', [TrayController::class, 'insertAllNew']);

        //PrescriptionPool
        Route::get('/prescription-pool/orders', [PrescriptionPoolController::class, 'orders']);
        Route::post('/prescription-pool/quick-tray', [PrescriptionPoolController::class, 'quickTray']);
        Route::get('/prescription-pool/dispensers', [PrescriptionPoolController::class, 'dispensers']);
        Route::post('/prescription-pool/allocate', [PrescriptionPoolController::class, 'allocate']);
        Route::post('/prescription-pool/release', [PrescriptionPoolController::class, 'release']);

        //User
        Route::get('/user', [UserController::class, 'me']);
        Route::get('/user/pharmacists', [UserController::class, 'pharmacistList']);
        Route::get('/user/dispensers', [UserController::class, 'dispenserList']);
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/all', [UserController::class, 'list']);
        Route::get('/users/{id}', [UserController::class, 'user']);
        Route::get('/esa_login_status', [UserController::class, 'loggedToEsa']);
        Route::post('/users/{id}', [UserController::class, 'update']);
        // Route::post('/users/{id}/toggle-2fa', 'toggle2FA'); // fetch a single user
        Route::delete('/users/{id}', [UserController::class, 'delete']);
        Route::post('/users', [UserController::class, 'create']);
        Route::get('/login_as/{id}', [UserController::class, 'loginAs']);
        Route::get('/users/{id}/2fa-status', [PasswordSecurityController::class, 'twoFactorVerifyStatus']);
        Route::get('/users/{id}/2fa-code', [PasswordSecurityController::class, 'code']);
        Route::post('/users/{id}/2fa-enable', [PasswordSecurityController::class, 'enable2fa']);
        Route::post('/users/{id}/2fa-disable', [PasswordSecurityController::class, 'disable2fa']);

        // Doctor
        Route::get('/doctors/index', [DoctorController::class, 'index']);
        Route::delete('/doctors/{id}', [DoctorController::class, 'deactivate']);
        Route::get('/doctors/{id}', [DoctorController::class, 'doctor']);
        Route::patch('/doctors/{id}', [DoctorController::class, 'update']);
        Route::post('/doctors', [DoctorController::class, 'insert']);
        Route::post('/doctors/{id}/signature', [DoctorController::class, 'uploadSignature']);

        //Client
        Route::get('/clients/index', [ClientController::class, 'index']);
        // Route::delete('/clients/{id}', [ClientController::class,'deactivate']);
        Route::delete('/clients/{id}', [ClientController::class, 'delete']);
        Route::get('/clients/{id}', [ClientController::class, 'client']);
        Route::patch('/clients/{id}', [ClientController::class, 'update']);
        Route::post('/clients', [ClientController::class, 'insert']);

        /*HELP*/
        Route::get('/help', [HelpController::class, 'index']);
        Route::post('/help', [HelpController::class, 'create']);
        Route::patch('/help', [HelpController::class, 'update']);
        Route::get('/info', [HelpController::class, 'info']);
        Route::delete('/help/{id}', [HelpController::class, 'delete']);

        /*MAIL*/
        Route::post('/mail/{id}/contact', [OrderController::class, 'contact']);

        /*LOGS*/
        Route::get('/logs', [LogController::class, 'index'])->name('logs');
        Route::get('/logs/view', [LogController::class, 'view'])->name('logs_view');
        Route::get('/logs/locked/{prescriptionID}', [LogController::class, 'locked'])->name('page_locked');
        Route::post('/logs/unlock/{prescriptionID}', [LogController::class, 'unlock'])->name('page_unlock');
        Route::post('/logs/takeover/{prescriptionID}', [LogController::class, 'takeover'])->name('page_takeover');
        Route::post('/logs/page-access', [LogController::class, 'page'])->name('page_access_log');
        Route::post('/logs/page-exit', [LogController::class, 'exit'])->name('page_exit_log');
        Route::get('/logs/page-exit', [LogController::class, 'exitRedirect']);
        Route::post('/logs/error', [LogController::class, 'error']);
        Route::get('/logs/app-activity', [LogController::class, 'appActivity'])->name('app_activity');
        Route::post('/logs/system/{id}', [LogController::class, 'logSystemActivity']);

        // Stats
        Route::get('/overview/activity', [HomeController::class, 'activity']);
        Route::get('/stats/activity', [StatsController::class, 'activity']);
        Route::get('/stats/activity/{id}', [StatsController::class, 'activityUser']);

        /* Blacklist */
        Route::get('/blacklist', [BlacklistController::class, 'index']);
        Route::post('/blacklist', [BlacklistController::class, 'createMultiple']);
        Route::post('/blacklist/delete', [BlacklistController::class, 'removeMultiple']);
        Route::delete('/blacklist/{id}', [BlacklistController::class, 'deactivate']);

        /* Dispensing Data */
        Route::get('/dispensing-data', [DispensingDataController::class, 'index']);

        /*Settings*/
        Route::get('/settings', [SettingController::class, 'index']);
        Route::patch('/settings', [SettingController::class, 'update']);
        Route::get('/settings/company', [SettingController::class, 'companySettings']);
        Route::patch('/settings/company', [SettingController::class, 'companySettingsUpdate']);

        /*API*/
        Route::get('/api/check-orders', [APIController::class, 'checkOrders']);
        Route::get('/api/check-orders/results', [APIController::class, 'getCheckOrdersResults']);
        Route::get('/api/approve', [APIController::class, 'checkOrders']);
        Route::post('/api/validate-address/{id}', [APIController::class, 'validateAddress']);

        /*PRODUCTS*/
        Route::get('/inventory/products/fdb', [ProductController::class, 'fdbIndex']);
        Route::get('/inventory/products', [ProductController::class, 'index']);
        Route::get('/inventory/product/{id}', [ProductController::class, 'getProduct']);
        Route::post('/inventory/products', [ProductController::class, 'addProduct']);
        Route::post('/inventory/products/fdb', [ProductController::class, 'addProductFDB']);
        Route::post('/inventory/products/import-preview', [ProductController::class, 'importPreview']);
        Route::post('/inventory/products/import-finish', [ProductController::class, 'importFinish']);
        Route::patch('/inventory/products/{id}', [ProductController::class, 'updateProduct']);

        Route::get('/inventory/products/list', [ProductController::class, 'list']);
        Route::post('/inventory/products/packs', [ProductController::class, 'listPacks']);
        Route::post('/inventory/products/pack/{id}/change-status', [ProductController::class, 'changePackProductStatus']);
        Route::get('/inventory/products/{id}/list', [ProductController::class, 'priceList']);
        Route::delete('/inventory/products/{id}/delete', [ProductController::class, 'delete']);
        Route::delete('/inventory/products/pricing/{id}', [ProductController::class, 'deletePricing']);
        Route::delete('/inventory/products/pack/{id}', [ProductController::class, 'deletePackProduct']);
        Route::post('/inventory/products/pack/ordering', [ProductController::class, 'updatePackOrdering']);
        Route::post('/inventory/products/{id}/reactivate', [ProductController::class, 'reactivate']);
        Route::get('/inventory/products/{id}/logs', [ProductController::class, 'logs']);
        Route::get('/inventory/products/csv', [ProductController::class, 'csv']);
        Route::get('/inventory/countries', [CountryController::class, 'index']);
        Route::get('/countries', [CountryController::class, 'list']);
        Route::get('/inventory/countries/csv', [CountryController::class, 'csv']);
        Route::get('/inventory/products/alternative-name', [ProductController::class, 'alternativeCheck']);
        Route::get('/inventory/products/alternative-unit', [ProductController::class, 'alternativeUnitCheck']);
        Route::get('/inventory/products/{id}/alternative-names', [ProductController::class, 'alternativeNameList']);
        Route::get('/inventory/products/{id}/alternative-units', [ProductController::class, 'alternativeUnitList']);
        Route::delete('/inventory/products/alternative-names/{id}', [ProductController::class, 'removeAlternativeProductName']);
        Route::delete('/inventory/products/alternative-units/{id}', [ProductController::class, 'removeAlternativeUnit']);
        Route::post('/inventory/products/approve-discrepancy', [ProductController::class, 'approveDiscrepancy']);
        Route::post('/inventory/products/approve-discrepancy-unit', [ProductController::class, 'approveDiscrepancyUnit']);

        Route::get('/inventory/products/{id}', [ProductController::class, 'product']);
        Route::get('/inventory/delivery/list', [ProductController::class, 'getDeliveryCompanies']);
        Route::get('/inventory/clients/list', [ProductController::class, 'getClients']);
        Route::post('/inventory/products/pricing', [ProductController::class, 'addProductPricing']);
        Route::post('/inventory/products/pack', [ProductController::class, 'savePackProduct']);
        Route::get('/inventory/products/fdb/{code}', [ProductController::class, 'findByEan']);

        //LABELS
        Route::get('/labels', [LabelController::class, 'index']);
        Route::post('/labels', [LabelController::class, 'save']);
        Route::get('/labels/{id}', [LabelController::class, 'single']);
        Route::get('/labels/group/{id}/products', [LabelController::class, 'products']);
        Route::delete('/labels/group/{id}/products/{productCodeId}', [LabelController::class, 'removeProduct']);
        Route::put('/labels/group/{id}/products/{productCodeId}', [LabelController::class, 'addProduct']);
        Route::post('/labels/{id}/disable/product', [LabelController::class, 'disableProduct']);
        Route::post('/labels/{id}/enable/product', [LabelController::class, 'enableProduct']);
        Route::patch('/labels/{id}', [LabelController::class, 'update']);
        Route::delete('/labels/{id}', [LabelController::class, 'delete']);
        Route::post('/labels/{id}/disable', [LabelController::class, 'disable']);
        Route::post('/labels/{id}/enable', [LabelController::class, 'enable']);

        //ADDITIONAL IFNROMATION
        Route::get('/additional-information', [AdditionalInformationController::class, 'index']);
        Route::post('/additional-information', [AdditionalInformationController::class, 'save']);
        Route::get('/additional-information/{id}', [AdditionalInformationController::class, 'single']);
        Route::get('/additional-information/group/{id}/products', [AdditionalInformationController::class, 'products']);
        Route::delete('/additional-information/group/{id}/products/{productCodeId}', [AdditionalInformationController::class, 'removeProduct']);
        Route::put('/additional-information/group/{id}/products/{productCodeId}', [AdditionalInformationController::class, 'addProduct']);
        Route::post('/additional-information/{id}/disable/product', [AdditionalInformationController::class, 'disableProduct']);
        Route::post('/additional-information/{id}/enable/product', [AdditionalInformationController::class, 'enableProduct']);
        Route::patch('/additional-information/{id}', [AdditionalInformationController::class, 'update']);
        Route::delete('/additional-information/{id}', [AdditionalInformationController::class, 'delete']);
        Route::post('/additional-information/{id}/disable', [AdditionalInformationController::class, 'disable']);
        Route::post('/additional-information/{id}/enable', [AdditionalInformationController::class, 'enable']);

        /* PRODUCT CRUD */
        Route::post('/inventory/countries/pricing', [CountryController::class, 'addCountryPricing']); //add new default pricing for country
        Route::patch('/inventory/countries/pricing/{id}', [CountryController::class, 'updateCountryPricing']); //update default pricing for country

        /*DOWNLOADS*/
        Route::get('/download/printer', [DownloadController::class, 'printer']);
        Route::get('/download/form', [DownloadController::class, 'blankPathologyForm']);
        Route::get('/download/jvm-ocs', [DownloadController::class, 'downloadOcs']);
        Route::get('/download/product-import-template', [DownloadController::class, 'importTemplate']);

        Route::get('/view/form', [DownloadController::class, 'viewBlankPathologyForm']);
        Route::get('/view/prescription', [DownloadController::class, 'viewBlankPrescription']);

        /* IMPORT */
        Route::post('/import/xml', [ImportController::class, 'manual']);

        /*JVM*/
        Route::post('/jvm/{id}/send', [JVMController::class, 'send']);
        Route::post('/jvm/{id}/status', [JVMController::class, 'status']);

        /*Invoices*/
        Route::get('/invoices', [InvoiceController::class, 'index']);
        Route::get('/invoice/{id}', [InvoiceController::class, 'invoice']);
        Route::post('/invoice/{id}/status', [InvoiceController::class, 'updateInvoiceStatus']);
        Route::post('/invoice/{id}/item', [InvoiceController::class, 'addItem']);
        Route::post('/invoice/{id}/email', [InvoiceController::class, 'sendEmail']);

        Route::get('ip-audit/search', [IpAuditController::class, 'search']);

        Route::post('/captcha-validation', [CaptchaServiceController::class, 'capthcaFormValidate']);
        Route::get('/reload-captcha', [CaptchaServiceController::class, 'reloadCaptcha']);
    });

    //dashboard and others
    Route::post('/logout', [LoginController::class, 'logout']);
});

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
