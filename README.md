# PassportJS Example with Couchbase Server and Facebook

This project shows how to use PassportJS in your Node.js application to perform oauth logins while saving information to Couchbase Server.  A use-case scenario would be allowing your users to sign into or create an account in your application via Facebook.

## Installation & Configuration

Certain configuration in both the application and the database must be done before this project is usable.

### Application

Checkout the latest master branch from GitHub and navigate into it using your Terminal (Mac & Linux) or Command Prompt (Windows).  Assuming you already have Node.js installed, run the following:

```
npm install
```

This will install all dependencies as defined in the **package.json** file.

Inside the **config.json** file you must set the Facebook `client_id`, and `client_secret` to a value found in your Facebook developer dashboard.  Inside your Facebook developer dashboard you must also set the **Valid OAuth redirect URIs** to the `callback_url` defined in your **config.json** file.

### Database

This project requires Couchbase 4.0 or higher in order to function because it makes use of the N1QL query language.  With Couchbase Server installed, create a new bucket called **passportjs-example** or whatever you've named it in your **config.json** file.

We're not done yet.  In order to use N1QL queries in your application you must create a primary index on your bucket.  This can be done by using the Couchbase Query Client (CBQ).

On Mac, run the following to launch CBQ:

```
./Applications/Couchbase Server.app/Contents/Resources/couchbase-core/bin/cbq
```

On Windows, run the following to launch CBQ:

```
C:/Program Files/Couchbase/Server/bin/cbq.exe
```

With CBQ running, create an index like so:

```
CREATE PRIMARY INDEX ON `passportjs-example` USING GSI;
```

Your database is now ready for use.

## Questions, Comments, Concerns?

Contact [@couchbase](https://www.twitter.com/couchbase) or myself, [@nraboy](https://www.twitter.com/nraboy), on Twitter if you'd like to chat about this application.

## Resources

PassportJS - [http://passportjs.org](http://passportjs.org)

Couchbase - [http://www.couchbase.com](http://www.couchbase.com)

Node.js - [http://www.nodejs.org](http://www.nodejs.org)
