module.exports = {
    db: {
        name: "egdb_v1",                    // Database name
        password: "1234",   // Database password
        username: "eguser",                // Database user
        host: "localhost",                       // Custom host; default: localhost
        port: "5432",                       // Custom port; default: 5432
        dialect: "postgres",                // The sql dialect of the database; default: postgres
        sync: false,                          // Synchronizing any model changes with database.
                                            // WARNING: this will DROP your database everytime you re-run your application
        logging: false
    },
    logging: {
        logLevel: 'debug',                   // Log Level. Options: 'silly', 'debug', 'verbose', 'info', 'warn', 'error',
        logQueries: true                    // Set this to true to log sql queries
    },
    pnlTableName: "pnl",                    // Name of the pnl table
    orderTableName: "order",               // Name of the order table
    historicAccountsTableName: "historic_pnl_accounts",
    historicPortfolioTableName: "historic_pnl_portfolio",


    prod_re: /A/,                           //regular expression to match account names that belong to PROD
    paper_re: /B/,                          //regular expression to match account names that belong to PAPER

    certificate_key_path: 'C:/Users/Jesus Gomez/ssl/localkey.pem',       // Absolute path to .key file
    certificate_crt_path: 'C:/Users/Jesus Gomez/ssl/localcrt.pem'        // Absolute path to .crt file
};