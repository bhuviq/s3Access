const moment = require('moment');

const popularFileTypes = require('../config/ext-icon.json');
const Layout = require('./layout.es6');

class IndexLayout extends Layout {

    header() {

        const data = this._data;

        return `<header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-info" id="navbar_top">
                <a class="navbar-brand" href="javascript:void(0);">${data.pageTitle}</a>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><a class="nav-link" href="/logout"> Logout </a></li>
                </ul>
            </nav>
        </header>`;
    }

    content() {

        const data = this._data;
        let result = data.result;

        let markup = result.map(singleData => {

            let html = ``;

            if (data.listOf == 'Buckets') {

                html = `<div class="col-md-3 col-sm-6 col-xs-12 py-2">
                    <a href="/bucket/${singleData.Name}">
                        <div class="card text-info">
                            <div class="card-body">
                                <i class="fa fa-box-open card-img-top display-2"></i>
                                <p>${singleData.Name}</p>
                            </div>
                            <div class="card-footer text-right">
                                <span>${moment(singleData.CreationDate).format(`DD MMM, YYYY`)}</span>
                            </div>
                        </div>
                    </a>
                </div>`;
            }
            else {

                if (singleData.isFolder) {

                    html = `<div class="col-md-3 col-sm-6 col-xs-12 py-2">
                        <a href="/bucket/${data.bucket}?q=${data.prefix || ''}${singleData.Key}">
                            <div class="card text-info">
                                <div class="card-body">
                                    <i class="fa fa-folder card-img-top display-2"></i>
                                    <p>${singleData.Key}</p>
                                </div>
                                <div class="card-footer text-right">
                                    <span>${moment(singleData.LastModified).format('DD MMM, YYYY HH:mm')}</span>
                                </div>
                            </div>
                        </a>
                    </div>`;
                }
                else {

                    let fileName = singleData.Key;
                    let ext = String(fileName).split('.').pop();

                    let iconObj = popularFileTypes.find(item => `.${ext}` == item.ext);

                    let icon = iconObj ? iconObj.icon : 'fa-file';

                    html = `<div class="col-md-3 col-sm-6 col-xs-12 py-2">
                        <div class="card text-info">
                            <div class="card-body">
                                <i class="fa ${icon} card-img-top display-2"></i>
                                <p>${singleData.Key}</p>
                                <a class="btn btn-sm btn-info downloadButton" target="_blank" href="/download/${data.bucket}?q=${singleData.original}">
                                    <i class="fa fa-download" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div class="card-footer text-right">
                                <span>${moment(singleData.LastModified).format('DD MMM, YYYY HH:mm')}</span>
                            </div>
                        </div>
                    </div>`;
                }
            }

            return html;
        }).join('');

        let directDownloadMarkup = data.listOf == 'Buckets' ? `` : `
        <div class="col-12 mx-auto text-right">
            <form action="/download/${data.bucket}" id="direct-download-form">
                <div class="input-group mt-4">
                    <div class="input-group-append">
                        <span class="input-group-text">Download File Directly</span>
                    </div>
                    <input type="text" class="form-control" placeholder="File Path"/>
                    <div class="input-group-append">
                        <button class="btn btn-success" type="submit">Download</button>
                    </div>
                </div>
            </form>
        </div>
        `;

        return `
        <div class="row">
            ${directDownloadMarkup}
            <div class="col-12 mx-auto text-center display-6 text-info content-list">
                <div class="card mt-4">
                    <div class="card-header">
                        <p class="h5">${data.listOf}</p>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            ${markup}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
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

            let form = document.querySelector('#direct-download-form');
            if (form) {
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    window.open(event.target.action+'?q='+event.target[0].value);
                })
            }

        </script>`
    }

}

module.exports = IndexLayout;