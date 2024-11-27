import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/admin" className="brand-link">
        <img src="/static/asset/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light">Koparion</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="/static/uploads/avata.jpg" className="img-circle elevation-2" alt="User" />
          </div>
          <div className="info">
            <a href="#" className="d-block">Username</a>
          </div>
        </div>
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Tìm kiếm" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
        </div>
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">
              <Link to="/admin/statistical" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>Thống kê</p>
              </Link>
            </li>
            {/* Các mục menu khác tương tự */}
            <li className="nav-item">
              <Link to="/admin/account" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>Tài khoản</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/category" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Danh mục</p>
              </Link>
            </li>
            {/* Thêm các link khác ở đây */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
