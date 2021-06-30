const Layout = require('./layout.es6');

class IndexLayout extends Layout {

    header() {

        const data = this._data;

        return `<header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-info">
                <a class="navbar-brand" href="#">${data.pageTitle}</a>
                <div class="collapse navbar-collapse justify-content-end">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="/logout"> Logout </a></li>
                    </ul>
                </div>
            </nav>
        </header>`;
    }

    content() {

        return ``;
    }

    scripts() {
        return `<script>
            document.addEventListener("DOMContentLoaded", function(){
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 50) {
                        document.getElementById('navbar_top').classList.add('fixed-top');
                        // add padding top to show content behind navbar
                        navbar_height = document.querySelector('.navbar').offsetHeight;
                        document.body.style.paddingTop = navbar_height + 'px';
                    } else {
                        document.getElementById('navbar_top').classList.remove('fixed-top');
                        // remove padding top from body
                        document.body.style.paddingTop = '0';
                    } 
                });
            });
        </script>`
    }

}

module.exports = IndexLayout;