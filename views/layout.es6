const Layout = require('es6views').Layout;

class BaseLayout extends Layout {

    parse() {

        this._markup = `<!DOCTYPE html>
        <html lang="en">
            ${this.head()}
            <body>
                ${this.header()}
                <div class="main-content">
                    ${this.content()}
                </div>
                ${this.footer()}
                ${this.scripts()}
            </body>
        </html>`;
    }

    head() {

        const data    = this._data

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>${data.pageTitle}</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,700">
            <link rel="stylesheet" href="/css/bootstrap.min.css">
            <link rel="stylesheet" href="/css/style.css">
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
        </head>
        <body>`;

    }

    header() {

        return ``;
    }

    content() {

        return ``;
    }

    scripts() {
        return ``;
    }

    footer() {

        const data = this._data;

        return `<footer>
            <div class="row">
                <div class="col-4">
                    Developed By: <a href="https://github.com/bhuviq" target="_blank">Bhuvi</a>
                </div>
                <div class="col-4 text-center">
                    ${data.pageTitle}
                </div>
                <div class="col-4 text-right">
                    Copyright &copy; ${(new Date()).getFullYear()}
                </div>
            </div>
        </footer>`;
    }

}

module.exports = BaseLayout;