## Version 1.0.9.3 - 25.06.2024

##### Order

-   Allow JSON request for new Order
-   Show Condition and Frequency Tags
-   Fixed: timestamp issues.

##### Other

-   Fixed: Pentesting issues.

## Version 1.0.9.2 - 09.05.2024

##### Report

-   Fixed: Not showing multiple product on POM and Report CSV.
-   Fixed: POM double click redirect to prescription page.

## Version 1.0.9.1 - 09.05.2024

##### In Tray

-   Fixed: order recieved time on in tray page.

## Version 1.0.9.0 - 06.05.2024

##### Reports

-   Fixed: CSV report for static data on reports page.

## Version 1.0.8.9 - 26.04.2024

##### Safety Check

-   MyDHL address verification API implemented while import order and safety check

##### Orders

-   Added Condition and Frequency fields, it will show on prescription page if present in XML.

## Version 1.0.8.8 - 16.04.2024

##### Reports

-   Static data for reports/POM Register/Dispensing data

## Version 1.0.8.7 - 27.03.2024

##### Safe IP Mail

-   Fixed: Allow to resend email if IP Address is rejected.

## Version 1.0.8.6 - 20.03.2024

##### IP Audit Report

-   Added IP Audit Report.

## Version 1.0.8.5 - 27.02.2024

##### Reports

-   Show Return Date and Changed 'status' column to 'returned'

## Version 1.0.8.4 - 01.02.2024

##### Tray

-   Fetching email and telephone number when an order moves from Shipped to Awaiting Shipped

## Version 1.0.8.3 - 17.01.2024

##### Tray

-   If the order is being redelivered i.e. the email, phone and mobile have been deleted and fetch the email, phone and mobile from XML
-   Fixed: Redelivery - patient/order notes shipping date correction

## Version 1.0.8.2 - 16.01.2024

##### Reports

-   Added dropdown option to search report by return history.

##### Order

-   Fixed: Incorrect courier assigned to packed products order.

## Version 1.0.8.1 - 18.12.2023

##### Order

-   Fixed: showing unit mismatch error on dispenser alternative view.

## Version 1.0.8.0 - 13.12.2023

##### General

-   Fixed: Dispensing data monthly counts.

## Version 1.0.7.9 - 11.12.2023

##### Order

-   Fixed: show warning icon for unit mismatch on dispenser alternative view.

##### General

-   Fixed: Dispensing data count issue between search records and csv records.

## Version 1.0.7.8 - 21.11.2023

##### General

-   Fixed: Cautionary and Advisory Labels - Deleting Product Mapping
-   Fixed: POM and Register wrong count.

## Version 1.0.7.7 - 02.11.2023

##### Signature

-   Show old inactive prescribers signatures

## Version 1.0.7.6 - 26.10.2023

##### Storage

-   Link Azure storage for file storage and access.

## Version 1.0.7.5 - 27.09.2023

##### General

-   Flush old client IP addresses

##### Prescription

-   Formated Pharmacy Labels, show checkboxes at bottom

## Version 1.0.7.4 - 14.09.2023

##### General

-   Added Slack Logger

##### Order

-   Show Packed Package In Order set in Product page.

##### Prescription

-   Formatting pharmacy Labels

##### Authorization

-   Added Office IP ignore for UK

## Version 1.0.7.3 - 24.02.2023

##### General

-   Demo mode indicator is now configured in the backend

## Version 1.0.7.2 - 22.02.2023

##### Authorization

-   Use safe IP mailing list set in the database

## Version 1.0.7.1 - 01.02.2023

##### Authorization

-   Fixed a bug where the user was not redirected to the default application after logging in
-   Fixed a bug where code login was causing errors

## Version 1.0.7 - 01.02.2023

##### Edit Address

-   Fixed a small bug with saturday delivery setting

##### Prescription

-   Removed some unused logging

##### Prescription Pool

-   Fixed an issue where the product quantities would not appear

## Version 1.0.6.9 - 13.01.2023

##### General

-   Upped security regarding viewing and printing prescriptions, labels and invoices

## Version 1.0.6.8 - 12.01.2023

##### Prescription Pool

-   Queried notes will no longer trigger a popup
-   Print logs will now be cleared only after adding new orders to an empty pool
-   Alternate product names now trigger a popup
-   Duplicate orders will now trigger a popup
-   Fixed an issue that caused "invalid date" text to appear

##### Orders

-   Added detailed order history logging

## Version 1.0.6.7 - 05.01.2023

##### Settings

-   Fixed a bug that caused the global settings tab not to load correctly

## Version 1.0.6.6 - 04.01.2023

##### Tray

-   Fixed a bug that would prevent the full pharmacists list from showing or the user being included in the list if the user was a locum pharmacist or a superintendent pharmacist

##### Prescription Query

-   Fixed an error related to the mailing routine sending an XML prescription status update to an invalid endpoint
-   Removed the XML prescription status client update subroutine

##### Backend

-   Added a more detailed logging subroutine

## Version 1.0.6.5 - 07.12.2022

##### Prescription Pool

-   Fixed print log overlaying on top of note modal
-   Updated the date formatting for history logs
-   Updated history logs so they only show 1 status line now

## Version 1.0.6.4 - 06.12.2022

##### Authorization

-   Fixed an issue that caused a black screen when logged out after inactivity

##### Edit Address

-   Fixed an issue where the Saturday delivery switch did not work on a Friday

## Version 1.0.6.3 - 06.12.2022

##### Prescription Pool

-   Added name mismatch tooltips
-   Fixed double clicking on the prescription not properly redirecting to the prescription

## Version 1.0.6.2 - 05.12.2022

##### Prescription Pool

-   Changed the way prescriptions/labels are printed to prevent printing prescription/labels on the wrong printer
-   Lock printing button while printing is ongoing
-   Added product alerts for fridge products and product name mismatch

## Version 1.0.6.1 - 01.12.2022

##### Interface

-   Changed the shipping button placement and color

## Version 1.0.6 - 30.11.2022

##### General

-   Minor royal mail logic fixes
-   Backend refactoring

##### Authorization

-   Added new global login system for all esasys apps
-   Added unified user management for all esasys apps
-   Added a script to merge esasys, inventory and pxp users

##### Prescription Pool

-   Added new prescription pool queue style module
-   Added ability to edit prescription notes from the prescription pool screen
-   Added ability to print prescriptions and labels from the prescription pool screen
-   Added patient history to the prescription pool screen
-   Added locking features to prescription pool

## Version 1.0.5.5 - 16.11.2022

##### General

-   Minor bugfix for company details settings page

##### Import

-   Enabled Royal Mail related import logic

## Version 1.0.5.4 - 07.11.2022

##### General

-   Added a possible fix for the "screen of death"
-   Fixed an issue with hidden prescription content and safety check messages

##### Prescription

-   Fixed the pharmacy labels, so that an additional page is shown in case of split packs

## Version 1.0.5.3 - 17.10.2022

##### Prescription

-   Fixed an issue alternative product name check would not show properly

## Version 1.0.5.2 - 10.10.2022

##### Dashboard

-   Subscription Note is now selected as the default note type when creating order alerts
-   Fixed an error where the demo banner would appear on prescriptions on the live app

## Version 1.0.5.1 - 07.10.2022

##### Dashboard

-   Fixed a bug where Onhold postponed orders would only appear on, the postponed to, date

## Version 1.0.5 - 07.10.2022

##### Dashboard

-   Added alerts toolbar icon near the information icon in the header with alert count
-   Alert icon leads to the alert screen on the dashboard
-   Added postponed (onhold) shipping orders alert for the current day and subscription order alerts list

##### Users

-   Adding a new user will now enable 2fa by default

##### Alerts

-   Added ability to add alerts by subscription id for orders not yet received by the system

##### Clients

-   Made the pending pharmacy URL and endpoint editable (the pending pharmacy query will only run for clients with both of these entries filled)

## Version 1.0.4 - 29.09.2022

##### Import

-   Added gender safety check
-   Updated Royal Mail import logic

## Version 1.0.3.9 - 28.09.2022

##### Import

-   Added new Royal Mail import logic and tracking service checks

## Version 1.0.3.8 - 27.09.2022

##### Import

-   Fixed an issue where some special characters in names and surnames would not be imported correctly

##### Edit Address

-   Added confirmation dialogue for saturday delivery
-   Enabled saturday delivery

## Version 1.0.3.7 - 08.09.2022

##### POM Register

-   Fixed a minor bug on the POM register where the address would not show in some specific circumstances

##### Prescription

-   Added new on hold reason to prescriptions and reports

## Version 1.0.3.6 - 29.08.2022

##### Prescription

-   Fixed an issue where certain product alternative names could not be approved properly

##### Dashboard

-   3 tiles on top of the alerts screen are not shown anymore until the pending prescriber count is reintroduced

## Version 1.0.3.5 - 09.08.2022

##### Prescription

-   Redelivery to new address shows clear address inputs

## Version 1.0.3.4 - 28.07.2022

##### Prescription Pool

-   Disabled EveAdam prescription pool logic
-   Disabled Pouch order prescription pool logic

## Version 1.0.3.3 - 26.07.2022

##### Prescription

-   Manually add tracking function will now update activity logs

## Version 1.0.3.2 - 13.07.2022

##### Products

-   Fixed a small bug that would break the autoloading of products when the browser window was zoomed out

## Version 1.0.3.1 - 11.07.2022

##### General

-   Removed an unneccessary gap at the top of the prescription screen

##### Products

-   Removed pouch column from bulk product import xls template
-   Pouch will now be set to disabled by default
-   VAT will now be set correctly

## Version 1.0.3 - 07.07.2022

##### Products

-   Added number of products imported when finishing import
-   Added import error logs when finishing import
-   Default pricing will now be added properly on import

## Version 1.0.2.9 - 05.07.2022

##### Products

-   Added logs on importing products

## Version 1.0.2.8 - 01.07.2022

##### Products

-   Added bulk product import with preview

## Version 1.0.2.7 - 30.06.2022

##### General

-   Change a small subject issue with safe ip emails

##### Clients

-   Enabled deleting clients

##### Reports and POM Register

-   Added inactive clients sublist to the clients selection

## Version 1.0.2.6 - 30.06.2022

##### Products

-   Added "drag and drop" ordering for pack products and applied it to the import process
-   Fixed a small issue where input field for quantity on adding a product was not visible on smaller screens

##### Import

-   Fixed an issue where Guernsey and Jersey postcode orders would not get assigned to Royal Mail if the postcodes were written in lowercased letters

## Version 1.0.2.5 - 23.06.2022

##### Dispensing Data

-   Added monthly data summary
-   In case the start date, end date or both are missing the results for dispensing data will default to last 6 months

## Version 1.0.2.4 - 22.06.2022

##### Users

-   Changed to role id's on the users table to role names (for example, instead of saying user role 60 it will now say Sysadmin)
-   Added user role checks for Locum Dispenser across the system

##### General

-   UPS and DHL tabs/buttons will not appear in In Tray and Prescription Pool anymore (will still appear in lists like delivery service selection in reports, pom register and similar)

## Version 1.0.2.3 - 16.06.2022

##### General

-   Made the following modals smaller and movable: Notes, Query, Edit Address, Create Alert
-   Added a button next to close that makes the background transparent and the app navigable while the modal is open
-   Made it possible to have Notes, Query and Edit Address modals open at the same time

##### Authorization

-   Fixed a small login bug

## Version 1.0.2.2 - 15.06.2022

##### Authorization

-   Added 2fa after login for 2fa enabled users

##### Users

-   Added a 2fa barcode section for individual users
-   Added ability to enable/disable 2fa for individual users

## Version 1.0.2.1 - 02.06.2022

##### Clients

-   The delete button on the clients table will now delete clients instead of deactivating them (the client can still be deactivated through the client editing interface)

## Version 1.0.2 - 02.06.2022

##### Users

-   Fixed an issue where a newly added user might not show up correctly on activity logs

## Version 1.0.1.9 - 20.05.2022

##### General

-   Fixed an issue where products on In Tray were not ordered properly

##### Reports

-   Added gender selection to Reports
-   Added inactive clients to the client list

##### POM Register

-   Added gender selection to POM Register
-   Added inactive clients to the client list

##### Dispensing Data

-   Added inactive clients to the client list
-   Added ability to search by individual products

##### Prescription

-   Added Onhold - Postponed Shipping Request substatus

## Version 1.0.1.8 - 06.05.2022

##### Prescription

-   When updating a prescription (manually or via API) the PDF will get regenerated properly with the new data

## Version 1.0.1.7 - 05.05.2022

##### Products

-   Fixed an issue where packaged products list appears when editing
-   Fixed an issue where packaged products would not properly appear when selecting another product
-   Fixed an issue where the products list would not work properly on products that had a forward slash in their code
-   Updating product pricing should no longer make the product list "dissapear"

## Version 1.0.1.6 - 03.05.2022

##### General

-   Fixed the session expired issue

##### Prescription

-   Prescription PDF changes (side block height change)
-   Order pack products by the way they are ordered on the product page

##### Products

-   Added ability to toggle pack product status on/off
-   Added a section to show packs the product is a part of
-   Changed the product logs ordering to date descending

## Version 1.0.1.5 - 21.04.2022

##### Prescription

-   Changed wording on products list
-   Prescription PDF changes

## Version 1.0.1.4 - 31.03.2022

##### Prescription

-   Added show attached products button to toggle the products list on/off

## Version 1.0.1.3 - 31.03.2022

##### General

-   The postponed status is not available as an option in the system anymore

##### Prescription

-   Show attached products expiry date and batch number

##### Daily Stats

-   Reverted the look

## Version 1.0.1.2 - 24.03.2022

##### Reports

-   Additional filter for pouch orders should now work as intended

##### Import

-   Updated ordering of pack products

## Version 1.0.1.1 - 24.03.2022

##### Dashboard

-   Fixed an issue where superintendent and locum pharmacists would not get prescriptions added in their tray if their tray was empty

##### Import

-   Fixed an issue where order would not be set to safety check status if it had an address more than 35 characters long

##### Alert

-   Added support for EveAdam missing orders count API

## Version 1.0.1 - 22.03.2022

##### Import (receive prescriptions)

-   Safety check fixes

##### Prescription

-   Do not show cautionary advice for UK unless there is also additional information

## Version 1.0 - 21.03.2022

##### Authorization

-   Added IP restricted zone interface
-   Added ability to whitelist IP's
-   Redirect all whitelist actions to the new system

##### Import (receive prescriptions)

-   Enabled API endpoints to receieve prescriptions
-   Fixed a date logging issue with the new import system
-   Added pre-import logging
-   Stopped showing Patient notes from the XML (these can be reenabled if needed)

## Version 0.9.9.9 - 18.03.2022

##### Import (receive prescriptions)

-   Fixed an issue where delivery country would not be set correctly

## Version 0.9.9.8 - 15.03.2022

##### Prescription

-   Fixed an issue where printing a PDF that was not generated properly would not correctly default to ESA

##### Clients

-   Added Client ID column to the client table

## Version 0.9.9.7 - 21.02.2022

##### Prescription

-   Fixed an issue where order specific notes would show for all orders in medical history

##### Dispensing data

-   Fixed an issue where CSV download on 'Dispensing Data' is only displaying the records on the webpage.

## Version 0.9.9.6 - 21.02.2022

##### Labels

-   Added delivery company logo to the last label and removed delivery company title from the second to last label

##### Prescriptions

-   Small styling changes to new prescription PDF's

## Version 0.9.9.5 - 13.01.2022

##### Clients

-   Fixed an issue where updating client details was not possible in case some fields were missing

## Version 0.9.9.4 - 04.01.2022

##### Backend

-   Additional error loging for the new import system
-   Various bugfixes in import system
-   Fixed some depricated backend funcionality

## Version 0.9.9.3 - 04.01.2022

##### Backend

-   Added support for new EveAdam reference numbers

## Version 0.9.9.2 - 11.11.2021

##### Products

-   Additional validation for adding new products (unique code required)

##### Labels

-   Adding product to a label group will now show which group it's been added to

## Version 0.9.9.1 - 28.10.2021

##### Products

-   Fixed a timestamp display bug

## Version 0.9.9 - 21.10.2021

##### Labels

-   Removed checkbox from products list in cautionary & advisory labels
-   The product delete button is now a soft delete and references are kept in the database

## Version 0.9.8.9 - 14.10.2021

##### Products

-   Alphabetically order the products for additional information and labels

## Version 0.9.8.8 - 13.10.2021

##### Products

-   Made the product edit page a bit more readable
-   Fix date formatting on product list

##### Prescriptions

-   Made the formulation units be pulled from the product database in case of a name match
-   Show the order specific formulation in case the product name doesn't match

##### Additional Information & Labels

-   Changed the styling, paddings, font sizes and buttons to be less of an eyesore

##### Dashboard

-   Added check by Client or Delivery Company options

## Version 0.9.8.7 - 30.09.2021

##### General

-   Hidden the tray for product management user role

## Version 0.9.8.6 - 30.09.2021

##### General

-   Added product management user role with read-only access to products page

##### Dispensing Data

-   Will now show product code column on the table

## Version 0.9.8.5 - 22.09.2021

##### Printer

-   Fixed an issue that possibly caused labels to sometimes print on the wrong printer

## Version 0.9.8.4 - 06.09.2021

##### Products

-   Removed add product button
-   Fixed adding delivery country
-   Fixed missing dropdown on viewing/updating delivery country
-   Save button now doesn't show if there were no changes done on the product/country

##### Prescription

-   Returned status in header and medical history now highlighted in black
-   Delivery notes will now appear on both the patient and order notes
-   Redelivery notes are now numbered depending on the number of redeliveries
-   Approved alternative names list imported

## Version 0.9.8.3 - 31.08.2021

##### Products

-   Removed deactivate and activate product buttons
-   Fixed remove and add client price logs
-   Fixed a bug where when adding the price, the name of the product in the dropdown dissapears
-   Fixed an issue where quantity and code of pricing entries were not changed when updating the actual product

## Version 0.9.8.2 - 30.08.2021

##### Products

-   Added product log list for each individual product

##### Backend

-   Backend code refactoring
-   Added system logs for products changes (updates, creation, pricing changes, etc.)

## Version 0.9.8.1 - 29.08.2021

##### General

-   Renamed Return to Returned across the system
-   Renamed 'Multiple Deliveries Attempted' to 'Multiple Deliveries Attempted by Courier'

##### Prescription

-   Redelivery button is now next to edit button
-   Redelivery button styling changed to fit
-   Fixed the redelivery button tooltip
-   Changed the prerequisite for redelivery to be the Returned status instead of shipped
-   Made the order redelivered title smaller
-   Fixed the 1 hour discrepancy between timestamp on order notes
-   Made the "APPROVE ALTERNATIVE NAME" and "SEND TO SAFETY CHECK" buttons a bit nicer

##### Products

-   Added alternative name list to product code editing screen
-   Added ability to remove an alternative name from the list and reset the product mismatch
-   Added titles for alternative names/aliases and pricing

## Version 0.9.8 - 24.08.2021

##### Prescription

-   Added a check for product name discrepancies
-   Added ability to approve a product name discrepancy and save it for future prescriptions
-   Added ability to send a prescription to safety check with a log for product discrepancy
-   Added support for return substatuses
-   Added support for returned and cancelled sub-substatuses
-   Added safety check substatus for product name mismatch
-   Medical history will now show a date for rejected orders
-   Medical history will now show orange coloured highlights for RETURN orders
-   Added ability to redeliver shipped orders
-   Added status and note changes for order redeliveries

##### In Tray

-   Returned status will remain in the In Tray count after the calendar day

##### Reporting

-   QUERIEDARCHIVED and QUERIEDNOREPLY statuses will now only show up in reporting
-   Status selection filter will now mimic the prescription status selector and increase width when neccessary

## Version 0.9.7.9 - 19.08.2021

##### Reports

-   Remove ClientID column
-   Fix an issue where pouch orders would not be filtered correctly on reports

## Version 0.9.7.8 - 19.08.2021

##### Prescription

-   Fixed an issue that would cause the prescription label to not be printable for always pouchable products
-   Fixed an issue where always pouchable items would cause the prescription to show as pouch order even if the order was not eveadam

##### Prescription Pool

-   Fixed an issue where clicking on pouch would pull in non-related prescriptions

## Version 0.9.7.7 - 18.08.2021

##### Products

-   The new products screen now has categorised inputs and clearer layout

##### Prescribers

-   Fixed a bug where the prescriber registration type did not include IMC as an option when creating a new prescriber
-   Updated form layout

##### Clients

-   Fixed the title text on the clients page
-   Added form headers
-   Updated form layout

##### Settings

-   Updated form layout

##### Prescription

-   Yellow banner for already approved will now show for senior pharmacist
-   Now prints 2 order id labels for pouch orders

##### Tray

-   Fixed a problem where the list of pharmacists would not appear for a senior pharmacist

##### Reports & POM Register

-   Added Jersey and Guernsey under the UK country selection

##### Dispensing Data

-   Align name column to the left
-   Do not show the country column in case no country is selected or the previous filter was removed
-   Do not show the client column in case no client is selected or the previous filter was removed
-   Backend fixes which should align the results more with the old ESA
-   Added Jersey and Guernsey under the UK country selection

##### General

-   Fixed an issue with the page going blank in case a user was logged out on that computer (will now redirect to the login screen)
-   Fixes related to detecting pouch orders
-   Various backend fixes

## Version 0.9.7.6 - 28.07.2021

##### In Tray

-   Fixed an issue with senior pharmacist and locum pharmacist where the order count was not correct

##### Authentication

-   Automatic logout after 2 hours of idle time

## Version 0.9.7.5 - 26.07.2021

##### POM Register

-   Show IMC doctor tag
-   Show prescriber history for prescriptions recieved previous to the 0.9.4.5 version

##### Prescriptions

-   Fixed discrepancies between app and printed prescriptions on historic orders
-   Enabled "resend OCS" for dispenser user roles

##### Prescriber History

-   Fixed issues with prescriber history not being taken into account when generating prescription pdf's

##### Dispensing Tab

-   Excel changed to use , as a separator rather than ;

##### User Roles

-   Added Senior and Locum Pharmacist user roles

##### Labels

-   Show Duplicate EveAdam Order ID Label

##### Reports & Register

-   Added ability to select multiple countries as a filter

## Version 0.9.7.4 - 12.07.2021

-   Do not show EveAdam letter box on the pharmacist tray

## Version 0.9.7.3 - 27.06.2021

##### Authorization

-   Fixed an issue where logging in with a code disabled password logins

## Version 0.9.7.2 - 25.06.2021

##### Prescription Pool

-   Fixed a small EveAdam allocation bug

## Version 0.9.7.1 - 24.06.2021

##### Tray

-   Unbolded the product name

##### Products

-   New products will now show up in the header selection
-   Headers now show in case there is no products in the package

## Version 0.9.7 - 24.06.2021

##### Prescriber

-   Contact Title is no longer mandatory
-   Show ID column on the prescriber table

##### Products

-   Change the button colours so they are less of an eyesore
-   Removed the "add new product on the bottom of the pack product editing modal"
-   Delivery pricing shown with 2 decimal places
-   Change the wording of Instruction to Print Instruction

##### General

-   Made all buttons a tiny bit nicer

##### Header

-   The order id/reference number search boxes and the search button are now finally aligned to center

##### Tray

-   Aligned to center the user selection and the tray buttons

## Version 0.9.6.9 - 23.06.2021

##### Prescriber

-   Fixed an issue where saving a prescriber would crash or multiply in case some of the non-required fields were not filled
-   Successfully saving a prescriber now automatically opens that prescribers edit page
-   Signatures will now correctly display for new prescribers
-   Do not show "broken image icon" for prescribers without signatures

##### Products

-   Show the product selection as a header
-   Removed dosage and retained the quantity input
-   Set a rule to not allow quantities below 0
-   Product list selection is now ordered by name
-   Product list selection now doesn't show countries unless needed (for delivery pricing selection)
-   Show quantity and product code in the product selection dropdown
-   Hide quantity and product code in the country selection dropdown
-   Added pouchable filter options and input forms for new products and product editing
-   Set pricing in the product list to 2 decimal spaces
-   Table header will now "stick" to the top when scrolling
-   Change 'Pack' to 'Package Product' and add tool-tip similar to old ESA

## Version 0.9.6.8 - 23.06.2021

##### Products

-   When adding a new product a default pricing set in the price input box will be applied
-   Fixed an issue when using apostrophes in the product search

## Version 0.9.6.7 - 22.06.2021

##### Authentication

-   Users can now only be logged in into 1 PC/Browser at the same time (applied to both username/password and code logins)

##### In Tray

-   Products are now shown together with their quantity and formulation
-   Clicking on the magnifier glass icon now opens the order in a new tab

##### Dispenser and Pharmacist Tray

-   Products are now shown together with their quantity and formulation

##### Prescription Pool

-   Fixed an issue where assigning EveAdam orders would result in assigning JVM orders with them

##### Prescription

-   Fixed a small backend bug in the pharmacy label view

##### Product Code

-   Added package support to the edit product code screen

## Version 0.9.6.6 - 24.05.2021

##### Edit Address

-   Fixed a possible issue that might have caused a previous prescription details to appear instead of the current ones

##### Additional Information

-   Product filter will now correctly show additional information for that product

## Version 0.9.6.5 - 13.05.2021

##### Products

-   Fixed a few typos
-   Added system logs for any action done on the products page

##### Cautionary and advisory labels

-   Added system logs for any action done on the cautionary and advisory labels page

##### User Activity Log

-   Added 15 and 60 minutes range selections on the activity graph
-   Added additional bars, depeding on the type of user activity, to the activity graph when a single user is selected

##### Dispensing Data

-   Made the search and other buttons disabled if no filters are selected

## Version 0.9.6.4 - 13.05.2021

##### Additional Information

-   Added additional information interface

## Version 0.9.6.3 - 13.05.2021

##### Prescription

-   Prescriber details history now taken into account when displaying the prescriber
-   Prescriber signature that was actual at the time the prescription was recieved will now be used instead of the most recent one
-   Remove some instances of extra commas appearing on the "Prescriber Address"

##### POM Register

-   Prescriber details history now taken into account when displaying the prescriber

##### Reports

-   Added tracking number column to CSV

##### Receieve prescriptions

-   Recieve prescriptions functionality on new ESA

##### Prescription, Labels

-   Capitalized all Names/Surnames

## Version 0.9.6.2 - 31.03.2021

##### Dispensing Data

-   Added unit column
-   Centered the table values

## Version 0.9.6.2 - 29.03.2021

##### General

-   Fixed an issue where if a product was set to always pouchable it would set all of the corresponding orders as pouch even if they were not EA orders
-   Added a pharmacy label view button

## Version 0.9.6.1 - 29.03.2021

##### Edit Address

-   Fixed an issue where pouchable could still be edited when the product was set to pouch disabled

## Version 0.9.6 - 28.03.2021

##### Orders

-   Added BMI indicator with values where BMI on the prescription is set

## Version 0.9.5 - 18.03.2021

##### Orders

-   Pouch orders now appear with a light purple background
-   When printing Order ID labels, only 1 label will print out now

## Version 0.9.4.9 - 17.03.2021

##### Orders

-   Added OCS resend for admins
-   Fixed a bug that might have caused the order barcodes to not be printed

##### Settings

-   In case the printer app is active the printers can now be selected via dropdown

## Version 0.9.4.8 - 16.03.2021

##### Orders

-   Enabled printing of id labels
-   Fixed some bugs related to sending OCS files to the Pouch machine

## Version 0.9.4.7 - 15.03.2021

##### Pouches

-   Changes in the OCS file format
-   Bugfixes

##### Prescription Pool

-   Fixed a bug that displayed pouch orders as EveAdam orders in case the pouchable parameter was set on product itself

##### General

-   Enabled dispensing data for dispensers

## Version 0.9.4.6 - 25.02.2021

##### General

-   Code refactoring

## Version 0.9.4.5 - 22.02.2021

##### General

-   Pharmacist now able so see labels tab

##### Prescriber

-   Added prescriber details archiving
-   Added prescriber signature archiving

## Version 0.9.4.5 - 03.02.2021

##### Dispensing Data

-   Added dispensing data tab

##### General

-   Backend code refactoring

## Version 0.9.4.4 - 21.01.2021

##### Reports

-   Fixed a bug in the reports that caused a crash when filtering fridge orders

## Version 0.9.4.4 - 20.01.2021

##### General

-   Added pouch order support
-   Added IMC tag for prescribers

## Version 0.9.4.3 - 19.01.2021

##### Reports

-   Fixed a bug that caused the UK country filter to not work properly

##### Table

-   Fixed a small error that might cause the scrollbar to go bonkers

## Version 0.9.4.2 - 18.01.2021

##### Reports

-   Added prescription download button on reports

##### Blacklist

-   Added blacklist interface

## Version 0.9.4.1 - 14.01.2021

##### In Tray

-   Show order substatuses for all users

##### Prescription

-   Fixed an issue that would cause the date not to appear on history for queried substatuses

##### Overview

-   Show 15 minute increments for detailed view and show all time points even with value of 0

##### Products

-   The delivery pricing and drug pricing only show for 'Active' Clients

##### Daily stats

-   It seems to have stopped snowing

##### General

-   CSV download will now filter out any HTML tags (for example in the in tray csv download)
-   The page title is now visible on the browser tab for all pages
-   Various frontend optimizations

## Version 0.9.4 - 31.12.2020

##### Prescription

-   Fixed a bug where if the delivery note or label was not printed and the user clicked next and subsequently clicked cancel the order would be stuck in loading status
-   Added support and separate routines for Pouch orders
-   When a dispenser prints a Pouch order and clicks next send the prescription OCS file to the Pouch machine via ftp

##### Labels

-   Do not show CI tag anymore

##### Prescription Pool

-   Allocate new button will now be disabled in case the order count is 0

##### Tray

-   Added support for Pouch orders to tray

##### Register

-   Multiple products selectable on register

##### Reports

-   Added additional report filters: COD, CI, Saturday Delivery, Access Point

## Version 0.9.3 - 09.12.2020

##### Prescription

-   Show Info indicator in case the prescription has Additional Information available
-   Show substatus description on duplicate order warning
-   Hide the substatus list by default but have it open in case a substatus is selected
-   Added a process to add tracking numbers manually outside of the edit address modal in case the order is in awaiting shipped

##### In Tray

-   Show substatuses for onhold and cancelled orders

##### Duplicate order popup

-   Show substatuses for onhold and cancelled orders

##### Reports

-   Show substatuses in results and csv downloads

##### General

-   Styling changes

## Version 0.9.2.9 - 07.12.2020

##### Prescription

-   Download order XML's shown for all users
-   Do not show the Reference Number field when editing notes
-   Added a quick fix for the delivery note printing issue

##### Daily stats

-   It seems to be snowing

## Version 0.9.2.8 - 07.12.2020

##### Prescription

-   Alerts are now categorised by type
-   User notes can now only be edited by the users who created them
-   User notes can now only be deleted by the users who created them and admin users
-   Added the ability to download order XML's

##### Prescribers

-   Added option to upload and view prescriber signatures

## Version 0.9.2.7 - 02.12.2020

##### Prescription

-   Added Cancel substatuses

##### Reports

-   Added new status and substatus selection to report filters
-   Added new filterable dropdowns
-   Added option to search for multiple products

##### POM Register

-   Added new filterable dropdowns

##### Settings

-   Enable download documents for all users

##### Pathology form

-   Styling changes in the new Pathology Form

## Version 0.9.2.6 - 01.12.2020

##### Prescription

-   Fixed a bug that caused a crash on clicking view prescription button
-   Added validation check for dates in the ONHOLD status popup
-   The status change confirmation popup now shows the correct text in case of user text inputs

## Version 0.9.2.5 - 01.12.2020

##### Dashboard

-   In case of multiple pages show pagination on the in tray table of prescriptions

##### Prescription

-   Upgraded the status dropdown to support substatuses
-   Added OnHold substatuses
-   Fixed an issue that would allow you to change the prescription status, while the prescription status is being changed
-   Do not show DOB on sub orders if test kit type is 2
-   Patient notes can now be set as alerts
-   Order alerts now have hover tooltips
-   Will not show info tile for cautionary advice in prescription footer if country is UK

##### Edit Address

-   Name and Surname character counts in edit address now appear as a single count
-   Add character counts to UPS Access Point address details

##### Tables

-   Block users from clicking forward or back in table pagination in case there are on the last or first page respectively

##### Settings

-   Added documents section
-   Pathology form can now be downloaded or edited inline and then printed

##### Users

-   API token is now generated for newly created users

##### General

-   Changed the styling on some of the modals to be more in line with the rest of the system

## Version 0.9.2.4 - 11.11.2020

##### Prescription

-   Added new prescription template
-   Added new routines for generating prescription PDFs

##### General

-   Code refactoring

## Version 0.9.2.3 - 05.11.2020

##### Register

-   Changed the positioning of Order ID and Ref. number

## Version 0.9.2.2 - 03.11.2020

##### Prescription

-   Added a small indicator to see which parts of the delivery note are being printed
-   Added a popup in case a certain combination of products is present in an order

## Version 0.9.2.1 - 23.10.2020

##### Overview

-   Fixed an issue that caused activities not to update properly

## Version 0.9.2.0 - 08.10.2020

##### Daily Statistics

-   Added daily statistics screen

## Version 0.9.1.9 - 02.10.2020

##### Dashboard

-   Fixed a bug where the alerts would not get registered correctly in some specific circumstances

## Version 0.9.1.8 - 11.09.2020

##### Prescription

-   Fixed an issue where the duplicate order banner would not show on canceled
-   If user is dispenser and order is moved into any status, it's removed from the pool and switched to next order
-   Formulation is now taken from the prescription data instead of product data
-   Added take over function for locked orders and re-locking procedure
-   Spelling fixes

##### Notes & Alerts

-   Pre-import alerts will no longer be assigned to unrelated prescriptions

##### General

-   Fixed a bug where the activities would get fetched even if the user was not on the activity screen
-   Fixed a bug where demo notification would not be visible on prescriptions

## Version 0.9.1.7 - 27.08.2020

##### Prescription

-   Fixed an issue where the status header would overlap with content

##### General

-   Fixed an activity log issue

## Version 0.9.1.6 - 25.08.2020

##### Overview

-   Added user and date filters to activity stream

##### Dashboard

-   Show only received date on the in tray table

##### Prescription

-   Made the status header fixed

##### Dispenser Pool

-   Added a "cleaning" functionality to the dispenser pool, that will automatically remove any order not in approved status, from the pool

## Version 0.9.1.5 - 23.08.2020

##### Reports

-   Show Received and Processed date in reports
-   Adjusted the graphs colour scheme

##### Overview

-   Added overview screen

## Version 0.9.1.4 - 21.08.2020

##### Prescription

-   Only pharmacist is now able to add query notes

##### Dashboard

-   Customer support users will now be able to see all relevant tabs

## Version 0.9.1.3 - 18.08.2020

##### Dashboard

-   Timed the blinking animation for alerts to 5 mins
-   Added editing functionality to pending order alerts

##### General

-   Fixed tool icons looking "squished" on some of the tables
-   Fixed a non-critical javascript error appearing on some pages

## Version 0.9.1.2 - 17.08.2020

##### Dashboard

-   Fixed a bug where CS users could not see UPS,DHL,RML
-   Fixed a minor bug in the frontend code

##### Prescription

-   CSS styling change
-   Fixed an issue where printing prescriptions that were not generated beforehand didnt create proper logs
-   Fixed the prescription datetime format not being formatted correctly with numbers <10

## Version 0.9.1.1 - 05.08.2020

##### General

-   Separated users for the new system

##### Prescription

-   Removed call required button

##### Edit Address

-   Show notes field only on orders where the notes field is already filled

##### Tray

-   No tray shown for customer support users

## Version 0.9.1.0 - 03.08.2020

##### Dispenser Pool

-   Fixed a bug where orders that were approved first would not get priority assignment to dispensers

## Version 0.9.0.9 - 03.08.2020

##### Labels

-   Added labels screen with CRUD support
-   Added checklists to enable/disable warning labels

##### General

-   Use a less obnoxious red colour across the application
-   Added new tooltips

##### Safety Check

-   Added a special UPS validation rule for Canary Islands

## Version 0.9.0.8 - 29.07.2020

##### Dashboard

-   Allow deletion of notes in the alert section

##### Edit Address

-   Added postcode formatter on changing delivery company or country

##### Products

-   Some styling changes to be more in line with the rest of the app

## Version 0.9.0.7 - 28.07.2020

##### Prescription

-   Show notes in the safety check warning section

##### Edit Address

-   Added delivery company recognition

##### Dashboard

-   Pending order alerts list

## Version 0.9.0.6 - 27.07.2020

##### Prescription

-   Show courier icon near the activity list
-   Changing prescription from safety check to new will redirect to dashboard/safety check
-   Added ability to resend tracking

##### Edit Address

-   Show Name and Surname character length as combined
-   Change the positioning of Name and Surname field
-   Move Commercial Value above COD Amount

##### General

-   Fixed an error handling issue on the frontend
-   Stopped showing null values

## Version 0.9.0.5 - 24.07.2020

##### Dashboard

-   Added checkmarks for import awaiting prescriptions on the dashboard
-   Added UPS COD logo to dashboard orders list

##### Edit Address

-   Change the size of input fields
-   Added a button to revalidate and save address changes

##### Prescription

-   Remove validate button when 'Address Validated Successfully' message is present

##### General

-   Fixed an issue where the logout routine would sometimes be called before the user monitoring routine, causing the session to be refreshed and the user logged back in
-   Cleaned up the input styling

## Version 0.9.0.4 - 23.07.2020

##### Dashboard

-   The warning message on creating alerts will now appear orange
-   Added a testkit override for alerts

##### Edit Address

-   Made the disabled fields more pronounced
-   Add UPS access point fields if the access point is switched on
-   Add ability to revert the removal of access point
-   Added more required fields to UPS access point

##### Prescription

-   Fixed a bug where the pharmacy label was still clickable, even when the delivery not was not printed

## Version 0.9.0.3 - 22.07.2020

##### Edit Address

-   Show 35 character limit instead of 30
-   Show Access Point dropdown

##### Prescription

-   Change "currently edited by" message to "currently opened by"
-   Fixed an issue where order specific notes would appear on other orders
-   Disable remaining foreign instructions on delivery note

## Version 0.9.0.2 - 17.07.2020

##### Dispenser Pool

-   Only show active dispensers

## Version 0.9.0.1 - 16.07.2020

##### Prescription

-   Show only english instructions temporary
-   Moved awaiting shipped above the shipped status in the status list
-   Removed the ability to temporary fetch customer email

##### Edit Address

-   Moved COD amount into delivery details
-   Greyed out commercial invoice amount and COD amount

##### General

-   Removed unused links/buttons to reduce clutter and confusion

## Version 0.9.0 - 09.07.2020

##### Prescription

-   Added a fix for a possible bug when navigating pages
-   In case the prescription PDF is not found redirect to old ESA prescription
-   Fixed a bug that probably caused "688970 - Order was locked as open by first user, however second user was still able to print order"
-   Fixed a bug that probably caused "686653 - Order which has not been printed but appears to have changed status"
-   Show deleted and edited note with the corresponding user (deleted in red text and edited in orange text)
-   Change the status list so the order corresponds to the dashboard tabs
-   Add tooltips to order ID and client reference number copy functionality and changed it's appearence
-   Added multilanguage support to prescription view and pharmacy labels (separate english/other language instructions)
-   Notes are now ordered correctly (deleted, edited or live)
-   Edited notes now appear as "children" of the top note
-   Fixed a bug where alerts would still pop up or duplicate if they were edited or deleted
-   In case an email is blank, don't show the email field, show reveal email button instead
-   Added reveal email functionality that temporary shows the customer email address
-   When changing orders to certain statuses the email will be cleared
-   Fixed an error that caused a crash in case the prescription didn't have a set name and surname
-   If the order is in Safety Check status only show SAFETYCHECK, NEW and CANCELLED as status options

##### Dashboard

-   Fixed an issue with the totals count not providing correct counts
-   Changed the alert screen text
-   Added safe button to safety check
-   Fixed a bug where the dashboard tabs loading would crash on user roles that were not admin, pharmacist or dispenser
-   Moved the Create Alert to the "Alert" view and changed it's description
-   Fixed the error banner not dissapearing on alert creation if the reference number was not found
-   Added a download button below the total that downloads all of the dashboard orders

##### Dispenser Pool

-   Fixed a bug that might have caused orders to be duplicated in the pool
-   Possibly fixed "Bug where the dispensers are getting orders in each other's pool"
-   When dispensers put the prescription on hold, they will move to the next order in tray
-   Disabled the allocation of order types that are not currently in the dispenser tray (if there is any orders in the dispenser tray)

##### POM Register and Reports

-   Fixed an issue with wrong client list being shown
-   Added multilanguage support (separate english/other language instructions)
-   Status selection dropdown order now corresponds to the dashboard tabs

##### Clients

-   Added clients screen with CRUD support
-   Fixed a bug that would show client active/inactive status incorrectly

##### Prescribers

-   Added prescribers screen with CRUD support
-   Fixed a bug that caused the prescriber list to error out on certain server configurations
-   Fixed some text and input labels

##### Settings

-   Added global settings
-   Added delivery company settings
-   Added company details settings

##### Edit Address

-   Added a counter to show how many characters are allowed for certain fields

##### General

-   Made the logout routine more reliable
-   Fixed a circular logic bug that might have caused the app to crash in case a user was logged out in another tab
-   Fixed a bug that may have cause a prescription to remain locked, even though the user logged out
-   Fixed an issue where logging out/in might sometimes show a an error screen
-   Fixed an issue where printing a label would not insert a correct log in the pharmacy label table making the invoicing bug out
-   Fixed an issue where a frontend error might not have been logged correctly

## Version 0.8.9.9 - 19.06.2020

##### General

-   Have the prescription page load as a separate component increasing the performance and reducing the package size of the app

##### Dashboard

-   Remove awaiting shipped for any role other than the pharmacist
-   Future alerts will now show Treated instead of EveAdam
-   Added refresh and download CSV buttons for alert
-   Alert won't refresh automatically anymore when clicked

##### Prescription

-   Added a new admin interface for prescriptions
-   Account for the length of patient name when positioning the pharmacy label page number
-   Notes can now be deleted by users with dispenser or higher privilege
-   Formatted dates on order notes to be in line with UK format

##### POM Register and Reports

-   Fixed a css issue that would cause the date picker to get cut off at the bottom on larger screens

## Version 0.8.9.8 - 17.06.2020

##### Dashboard

-   Show courier breakdown
-   Changed names of safety and awaiting
-   Changed the placement of some of the tabs

##### Prescription

-   Show if order has already been approved only for the pharmacist
-   Print UPS CI or COD on the pharmacy label
-   Increase the size of the courier name on the pharmacy label
-   Fix overlap issue on some products with longer names on the pharmacy label
-   Fix the position of the patients name on the pharmacy label
-   Make fridge products more visible on the dispenser view

##### Prescription Pool

-   Added special exemption for EveAdam orders

##### Tray

-   Pharmacists can now see tray entries for other pharmacists that haven't logged in that day in case the tray of the other pharmacist still has orders in it
-   Clearing or taking over a tray will now change the selected user to the currently logged in one and refresh the user list

## Version 0.8.9.7 - 16.06.2020

##### Dashboard

-   Show pending pharmacy orders count with alert
-   Show pending pharmacy orders list
-   Show pending subscriber and pending pharmacy orders counts on the list view

##### Prescription

-   Removed back button and redesigned next button
-   Added finish button
-   Fixed bug that would redirect the dispenser to the in tray instead of prescription pool when finishing

##### Edit Address

-   Switched places for the delivery and home details

## Version 0.8.9.6 - 11.06.2020

##### Prescription

-   Labels are now easier to read when printed
-   Changed label barcode to Code 128 format for better compatibility
-   Accounted for multiple products in labels
-   Accounted for bigger character counts for instructions and warnings in labels
-   Two barcodes now printed on the label if client is EveAdam

## Version 0.8.9.5 - 10.06.2020

##### Tray

-   Added dispenser features to the tray
-   The dispenser tray is now connected to the prescription pool directly

##### Prescription

-   Alert notifications can no longer be dismissed by pressing the ESC button or clicking outside the box
-   Made the prescriptions view less twitchy when moving from prescription to prescription
-   Fixed a bug in prescription navigation via keyboard
-   Added printer app support
-   All users except pharmacists default to 'orders' tab

##### POM Register

-   Sped up the initial loading of the register quite a bit while still showing the total count or orders found

##### Prescription Pool

-   Added prescription pool screen with CRUD support
-   Added role limitations for prescription pool. Only dispensers can add items to their pool. Admins and dispensers can release them

##### General

-   Fixed a bug where users with no set ESA user ID could use the application
-   Added tooltips for menu options and some buttons
-   Notifications now cover less space, previously they prevented users from using parts of the interface while they were present

##### Settings

-   Added application settings that allow users to set up label and delivery note printers (defaults are preset)

## Version 0.8.9.4 - 28.05.2020

##### General

-   Removed most of the ugly new Chrome outlines
-   Fixed a few minor backend bugs

##### Reports

-   Reports will not get preloaded when first accessing the page

##### Prescription

-   Sub orders for test kits will not show the parent sub order details anymore

## Version 0.8.9.3 - 27.05.2020

##### General

-   Added demo mode notifications for every screen

##### Prescription

-   Added a check if delivery note and pharmacy letter are printed when dispensers click on on next or previous order

## Version 0.8.9.2 - 26.05.2020

##### Prescription

-   Added a test kit section with information for each individual test kit

##### General

-   Top search button is disabled if there is no Order ID or Reference number typed in
-   Date selector will now display the today's date in a different colour

##### Products

-   Added products screen with CRUD support
-   Modified styling of the Products screen to match with the rest of the application

##### POM Register & Reports

-   Made the styling of the screens less "boxy"

##### Tables

-   Loader is now visible when content is being loaded
-   Made it easier to see which column is selected for ordering by

## Version 0.8.9.1 - 20.05.2020

##### Prescription

-   Added two special cases for prescription history query

## Version 0.8.9 - 21.04.2020

##### Reports

-   Fixed a bizzare bug that would cause an order status being unknown to shift all of the unknown statuses to the middle of the result table

##### POM Register

-   Added instructions to the POM Register

##### General

-   Added missing tooltips for saving and printing search results

## Version 0.8.8 - 17.04.2020

##### Prescription

-   Changed the medical history to load independently of other components in order to speed up the time it takes to make the prescription interactable

## Version 0.8.7 - 17.04.2020

##### Login

-   Changed login colour scheme
-   Changed login logo

##### Tray

-   Show options and Approve button are now locked if the prescription is already in another pharmacists tray

##### Prescriptions

-   Fixed a bug where columns that are null or empty string on both current and changed column would be highlighted

##### General

-   Show UPS access point image where applicable

## Version 0.8.6 - 16.04.2020

##### Edit Address

-   Fixed a bug that caused UPS access point details not to show properly when edited
-   Added a prefix for UPS access point details

##### Prescription

-   Added highlighting to changed values in reversions

##### General

-   Added the API framework and new endpoints and oauth2 authorization for connection to external services

## Version 0.8.5 - 13.04.2020

##### Prescriptions

-   Added UPS access country field in edit

##### Edit Address

-   Separated edit fields into 2 columns for home and delivery

## Version 0.8.4 - 12.04.2020

##### Prescriptions

-   Show shipping country on prescription instead of home country
-   Fix a check causing an error with error sound when updating the prescription
-   When an order status is changed to any variant of queried, switch to dashboard and disregard the tray
-   Fixed a bug in multiple search function, will work as intended now
-   Indented prescriber address second line

##### Reports and POM Register

-   Clicking on an order from the results now opens the order in new tab
-   Added save filters button
-   Added tooltips for buttons
-   Added clear button for date picker, when a date is entered

##### Notes

-   Added ability to edit and update notes

## Version 0.8.3 - 10.04.2020

##### Prescriptions

-   Added lock functionality for prescriptions

## Version 0.8.2 - 09.04.2020

##### Edit Address

-   Fixed bugs related to UPS Access Point reviewing
-   Changes in wording

##### Prescriptions

-   Made only the first order update revertable for users that are not admins
-   Added a view functionality for reversions
-   Changes in wording

##### Reports

-   Added ability to search by new line, space and comma for multiple id search

##### General

-   Fixed the bug that would cause some of the tables in the app not to be orderable
-   Added page visit log subsystem

## Version 0.8.1 - 06.04.2020

##### Dashboard

-   The queried tab will now be set as default only when an order was changed to one of the queried statuses on the prescription screen

##### Edit Address

-   Fixed an issue that caused values to not be recognized as changed when clicking the review button
-   Added text box for notes, with increased textbox size

##### Prescriptions

-   Added column aliases on changelog revert functionality
-   Fixed a small bug that caused countries and companies not to be correctly shown on changelog revert

##### Notes

-   Modified notes tab text and functionality
-   Added order specific notes
-   Moved ESA order specific notes to the order specific notes tab
-   Implemented note alerts (both patient or order specific)
-   Added a confirmation dialogue when deleting notes

##### General

-   Smaller appearance changes of sidebar colour scheme and other components
-   Fixed a bug that might cause queries or other functionalities that use a modal, be applied to the wrong prescription, when using right and left arrows on the keyboard, followed by a save

## Version 0.8.0 - 02.04.2020

##### Dashboard

-   The app now remembers which tab was last clicked and will default to it on page refresh (it will default to new on empty tray)
-   Table ordering by products has been turned off as it didnt work and was erroring out

##### Edit Address

-   Fixed a bug where clicking on review would automatically save the edit
-   Added a back button on the review screen for easier editing
-   Use aliases instead of database column titles to match the first edit screen
-   Show country and delivery company titles instead of ID's
-   Fixed a bug that caused an error in case the order was undefined

##### Reports and POM Register

-   Fixed a bug that caused a crash when searching by product
-   Fixed a bug that caused the search to go into loading state indefinitely in case a filter combination caused an error

##### Prescriptions

-   Fixed a bug that caused prescription id's to not be properly set when using browser navigation causing various issues including
    contacts being send to the wrong prescription or the wrong prescription to be edited
-   Made "IN TRAY", "NEW" and "APPROVED" text on the prescription header clickable with redirect and tray toggle functionalities

##### View Prescription

-   View prescription will now show a PDF identical to the one shown on ESA in case one exists
-   Prescription can now be downloaded in PDF
-   Prescriptions can now be printed

##### Tray

-   Added an error notification in case a PrescriptionID was not correctly set or a prescription was not correctly loaded

##### Notes

-   Added order specific notes and accompanying toggle

##### Contact Form

-   Added additional error handling in case the prescription was not found

##### Code Login

-   Added a fix to prevent the browser offering autocomplete suggestions

##### General

-   Made the warning banners just a little bit less of an "eyesore"
-   Implemented 4sm Printer application support for Prescriptions (currently disabled)

## Version 0.7.9.3 - 31.03.2020

##### Reports and POM Register

-   Show reference numbers and order id's that were not found in red background on the bottom of the result set

## Version 0.7.9.2 - 13.03.2020

##### Edit Address

-   Added change review when editing order, with additional confirmation
-   Added backend checks if the correct order has been edited

##### Activities

-   All order editing will now be fully logged in activities
-   Added an ability to revert an order edit through the activities log

## Version 0.7.9.1 - 03.03.2020

##### Logs

-   Added a log explorer for admins

##### Dashboard

-   Added a listener that will update the status counts when they are clicked on

## Version 0.7.9.1 - 15.02.2020

##### Prescriptions

-   Added an additional check to see if an order has already been approved

## Version 0.7.9 - 15.02.2020

##### Dashboard

-   If there is only 1 pharmacist logged in and they click on on of the orders on the dashboard, add 20 new orders to their tray

##### Prescriptions

-   Changing order status will change the UpdateDate now (will avoid the year 1970 bug)

##### Reports & POM Register

-   Added capability to search for multiple orderIDs and reference Numbers like "500000, 500001"

## Version 0.7.8 - 13.01.2020

##### View Prescription

-   View prescription now rendered by Pharmacist instead of defaulting to ESA

##### Prescriptions

-   Fixed the orders being slotted in the bottom place when moved from safety check

##### Reports & POM Register

-   Made sure the memorized search filters are used on the table load
-   Added "filter reset" button
-   Added pagination and count to the top of the table

##### Querying & Prescriptions

-   Fixes in error handling
-   In case of an error the modal will not be closed, and an error will be shown under the input fields

##### General

-   Made sure the prescriptions with duplicate reference modal can appear in any page in the system not just the dashboard
-   Various backend fixes, including better exception handling for the mailing system and order querying
-   Improvements in the logging system

## Version 0.7.7 - 07.01.2020

##### Dashboard

-   Show prescriptions with duplicate reference numbers in a modal window

##### Reports

-   Memorize the last selected search filters

##### General

-   Minor backend fixes

## Version 0.7.6 - 06.01.2020

##### Sidebar

-   Sidebar menu redesign
-   Sidebar menu now includes icons for all menu items
-   Removed sidebar header (served no purpose and had no interactivity)
-   Memorized if the sidebar is in closed or open state

##### Prescription

-   Memorize the product display layout on selection (in case the user refreshes the app)

## Version 0.7.5 - 31.12.2019

##### Prescription

-   Fixed a possible bug on querying orders
-   Show correct prescriber name for HR Healthcare Pharmacy
-   Show HR Healthcare Pharmacy with magenta background

## Version 0.7.4 - 23.12.2019

##### Prescription

-   Fixed certain prescription details not showing correctly

## Version 0.7.3 - 23.12.2019

##### Prescription

-   Fixed the prescription dates being incorrectly formatted

##### Authentication

-   Added code login facilities

## Version 0.7.2 - 11.12.2019

##### Prescription

-   Fixed a bug where the correspondence would not be fetched correctly if the name had certain characters
-   Show date in order history for queried orders
-   Fixed a crash if delivery company was not defined

##### POM Register & Reports

-   Formatting fixes on register and reports CSV download

## Version 0.7.1 - 11.12.2019

##### General

-   Date and timestamp of login added underneath users name in top right

##### Prescription

-   Replaced Order # and Ref # with alternative text
-   Show updated date on the first product in a prescription if shipped or canceled

## Version 0.7.0 - 11.12.2019

##### Dashboard

-   Courier icons shown on In Tray
-   All orders now visible on In Tray, with orders that are already in a Tray not selectable

##### POM Register & Reports

-   CSV download now shows prescriber and patient details in separate columns
-   CSV download not showing tags

##### Users

-   Inactive users not shown

##### Tray

-   Courier icons shown on Tray

##### Prescription

-   Show courier in prescription info
-   Allow Pharmacist to delete notes

## Version 0.6.9 - 10.12.2019

##### General

-   Table columns width set to variable and will now adjust depending on content size

##### Prescription

-   Query message is now addressed to prescriber
-   Changed online doctor to client on medical history

##### POM Register & Reports

-   Headings of the dropdown fields can now be selected for default value
-   HTML tags not showing on CSV download anymore

## Version 0.6.8 - 06.12.2019

##### Prescription

-   Show tracking code near shipped/supplied date
-   Added patient and pharmacy notes as note type
-   All queries will be properly logged in activities

##### Tray

-   Added tray item count for other pharmacists

##### POM Register

-   Added patient name and details

##### General

-   Added last login time attribute to users

## Version 0.6.7 - 05.12.2019

-   Fixed POM Registry issue where a blank field would appear for patient name/address
-   Added more detailed backend logging capabilities

## Version 0.6.6 - 04.12.2019

##### User management

-   Added user management backend and frontend for administrators

## Version 0.6.5 - 29.11.2019

##### Reports and Register

-   Change styling for some columns
-   Add GMCNO to prescriber columns
-   Add postcode and country to prescriber and patient columns

##### Prescription

-   Bold shipped date
-   Fix the status dropdown so it doesn't show pink characters on certain statuses
-   Add loading indicator on querying orders
-   Disable submit and cancel button while the order is being queried
-   Make sure the correspondence is available from previous prescriptions

##### General

-   Expand side menu as default
-   Implement frontend cache busting

## Version 0.6.4 - 28.11.2019

##### Reports and Register

-   Replace 'Select Doctor' with 'Select Prescriber'
-   Add a drop down/filter for 'Client' on both reports and register
-   Fix country dropdown display
-   Product list now includespack size

## Version 0.6.3 - 27.11.2019

##### Dashboard

-   Fix the order count on the dashboard
-   Show the awaiting orders to administrators

## Version 0.6.2 - 27.11.2019

##### Prescription

-   Add pharmacy notes and patient notes (queried notes) tabs with content
-   Added a "badge" to show the current number of pharmacy/patient notes
-   Move fridge product warning to the product itself
-   Fixed notes from ESA not showing
-   Added options to delete notes
-   Changed the medical history look
-   Make the instructions font bigger
-   Show the medical history in order
-   Show tooltip on every order for medical history
-   Fixed a bug where querying an order would not change it's status correctly

##### Dashboard

-   Change the visible dashboard information
-   Added the option to select a specific number of orders to add to tray

##### Reports

-   Fixed multiple issues with reports including: dropdowns for doctors and delivery companies, made exact match preselected, made sure the order statuses are correctly filtered on search
-   Added the option to search by product

##### Registry

-   Added Registry page

## Version 0.6.1 - 25.11.2019

##### Dashboard

-   Fixed the total values not showing correctly

##### Tables

-   Show 200 rows by default in tables

##### Prescription

-   New count now properly changing when order status changes
-   Show a banner if there is a fridge product in the order
-   Gender colours: orange for transgender, grey for school

###### Order History

-   History now not accounting for middle name when giving results

##### Tray

-   Remove order from pharmacist tray when queried

## Version 0.6.0 - 21.11.2019

##### Prescription

-   Fixed a bug where orders where some some products would not display on the order if the product didn't have instructions
-   Queried orders functionality should send out emails properly now, without erroring out

## Version 0.5.9 - 21.11.2019

##### Prescription

-   Switched DOB and Age positions
-   Capitalize medicine name and prescription name and surname
-   Put products on top of medical history entry
-   Make the error box more nothicable

##### Backend

-   Fixed the bug where orders were sometimes showing duplicate products

##### Tray

-   Show the option to replace the tray with orders in status NEW

## Version 0.5.8 - 20.11.2019

##### General

-   Doubled the size of all scrollbars
-   Success messages only shown to 2 seconds

##### Prescription

-   Fixed product duplication on the product list
-   Change the female gender option from purple to pink
-   Order errors (duplicate, already approved) are now shown in bold
-   Increase font size for products
-   Decrease font size for prescription information
-   Correctly show the packs and quantity on product information
-   Added postcodes to prescriber and delivery address
-   Added cancelled date to medical history
-   Show no notes found on notes, if there are no notes on the prescription
-   Fixed the translations, so only the questionnaire get's translated

##### Dashboard

-   Remove the view button and change the background colour of the stats items
-   Move the POSTPONED status next to queried

## Version 0.5.7 - 18.11.2019

##### General

-   Better messages
-   Added safe button for safetycheck orders

##### Show Options

-   Fixes on the send message component

##### Backend

-   Changes in the Prescription endpoints
-   Fixes in email components
-   Update orders on order postponement

## Version 0.5.6 - 15.11.2019

##### Dashboard

-   Changed the daily stats styling
-   Reordered daily stats elements
-   Added return stats

##### Backend

-   Speed optimizations
-   Fixed error handling on some backend functionalities

## Version 0.5.5 - 14.11.2019

##### Prescriptions

-   Added proper doctor type display
-   Fixed the activities height increasing other elements

## Version 0.5.4 - 14.11.2019

##### Prescriptions

-   Added message for duplicate orders
-   Changed colour on the topbar depending on prescription status (shipped, approved)
-   Added prescription shipped dates on history and prescription details
-   Added prescriber address
-   Added pharmacy address to bottom
-   Added prescription view

## Version 0.5.3 - 30.10.2019

##### Prescriptions

-   Added a message box on top of the prescription in case it has been previously approved
-   Created 2 layouts and added layout selection for products list

##### Backend

-   Fixed a bug in the note controller
-   Fixed a bug in the order controller

## Version 0.5.2 - 30.10.2019

##### Prescriptions

-   Gender Field – Changed background colour similar to current wireframes
-   Moved ‘Client’ field under ‘Prescriber’ field
-   Changed the Prescriber field to have same information as current wireframes
-   Added country to the address column
-   Added mobile, telephone and email address to address column
-   Changed the prescription info left column to stand out
-   Added heading to activities log
-   Changed top green banner to ESA blue
-   Added show options button
-   Added name and date to notes
-   Changed the highlight type of critical information
-   Added table shading to questionnaire and activity log

##### Tables

-   Enabled doubleclick functionality

## Version 0.5.1 - 27.10.2019

##### Reports

-   Allow downloading all of the search results in CSV format

##### Backend

-   Fix some bugs in prescription endpoints
-   Added 'RETURN' status support

## Version 0.5.0 - 03.09.2019

##### General

-   First version
