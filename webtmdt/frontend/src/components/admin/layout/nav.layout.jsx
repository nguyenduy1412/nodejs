import React from 'react';

const Navbar = () => {
    return (
        <nav className="main-header navbar navbar-expand">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i className="fas fa-bars"></i>
                    </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="/admin" className="nav-link">Trang chủ</a>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto align-items-center">
                <li className="nav-item">
                    <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i className="fas fa-search"></i>
                    </a>
                    <div className="navbar-search-block">
                        <form className="form-inline">
                            <div className="input-group input-group-sm border">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append bg-light">
                                    <button className="btn btn-navbar" type="submit">
                                        <i className="fas fa-search"></i>
                                    </button>
                                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments"></i>
                        <span className="badge badge-danger navbar-badge">3</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <a href="#" className="dropdown-item">
                            <div className="media">
                                <img src="/asset/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Brad Diesel
                                        <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                    </h3>
                                    <p className="text-sm">Call me whenever you can...</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div>
                        </a>
                        {/* Các mục dropdown khác tương tự */}
                        <div className="dropdown-divider"></div>
                        <a href="https://uhchat.net/admin/" target="_blank" rel="noopener noreferrer" className="dropdown-item dropdown-footer">See All Messages</a>
                    </div>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-bell"></i>
                        <span className="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header">15 Notifications</span>
                        {/* Các mục thông báo khác tương tự */}
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </li>

                <li className="dropdown nav-item user user-menu">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <img src="/uploads/avata.jpg" className="user-image" alt="User Image" />
                    </a>
                    <ul className="dropdown-menu">
                        <li className="user-header">
                            <img src="/uploads/avata.jpg" className="img-circle" alt="User Image" />
                            <p>
                                <small>Member since Nov. 2012</small>
                            </p>
                        </li>
                        <li className="user-body">
                            <div className="row d-flex justify-content-between">
                                <div className="col-xs-4 text-center">
                                    <a href="#">Followers</a>
                                </div>
                                <div className="col-xs-4 text-center">
                                    <a href="#">Sales</a>
                                </div>
                                <div className="col-xs-4 text-center">
                                    <a href="#">Friends</a>
                                </div>
                            </div>
                        </li>
                        <li className="p-2 d-flex justify-content-between bg-light">
                            <div className="pull-left">
                                <a href="/admin/profile" className="btn btn-default btn-flat">Profile</a>
                            </div>
                            <div className="pull-right">
                                <a href="/logout" className="btn btn-default btn-flat">Sign out</a>
                            </div>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                        <i className="fas fa-th-large"></i>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
