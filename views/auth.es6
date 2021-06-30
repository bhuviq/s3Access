const Layout = require('./layout.es6');

class AuthLayout extends Layout {

    content() {

        return `<div class="row align-items-center login-row">
            <div class="col-sm-4 mx-auto">
                <h2 class="text-center text-secondary">Connect to Amazon S3</h2>
                <div class="login-box">
                    <form class="form" method="post">
                        <h3 class="text-center text-info">S3 Credentials</h3>
                        <div class="form-group">
                            <label for="username" class="text-info">Access Key ID:</label><br>
                            <input type="text" name="key" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password" class="text-info">Secret:</label><br>
                            <input type="password" name="secret" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
    }

}

module.exports = AuthLayout;