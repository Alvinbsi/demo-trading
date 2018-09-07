export const admimMenu = [
  // {
  //   title: 'Dashboard',
  //   path: '/dashboard',
  //   icon: 'fas fa-tachometer-alt',
  //   subMenuCollapse: true,
  //   submenu: []
  // },
  // {
  //   title: 'Settings',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-cog',
  //   subMenuCollapse: true,
  //   submenu: [
  //     {
  //       title: 'Market Settings',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Currencies',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Log',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Cron Log',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Commission',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Email Transporter',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     }
  //   ]
  // },
  {
    title: 'Users',
    path: '/page-under-construction',
    icon: 'fas fa-users',
    subMenuCollapse: false,
    submenu: [
      {
        title: 'Admin',
        path: '/page-under-construction',
        icon: '',
        subMenuCollapse: false,
        submenu: [
          {
            title: 'List',
            path: '/admin/user-lists',
            icon: '',
            subMenuCollapse: true,
            submenu: []
          },
          {
            title: 'Add New',
            path: '/admin/add-user',
            icon: '',
            subMenuCollapse: true,
            submenu: []
          },
          // {
          //   title: 'Access Control',
          //   path: '/page-under-construction',
          //   icon: '',
          //   subMenuCollapse: true,
          //   submenu: []
          // },
          // {
          //   title: 'My Accounts',
          //   path: '/page-under-construction',
          //   icon: '',
          //   subMenuCollapse: true,
          //   submenu: []
          // },
          // {
          //   title: 'Logins',
          //   path: '/page-under-construction',
          //   icon: '',
          //   subMenuCollapse: true,
          //   submenu: []
          // }
        ]
      },
      {
        title: 'Investors',
        path: '/page-under-construction',
        icon: '',
        subMenuCollapse: true,
        submenu: [
          {
            title: 'List',
            path: '/investor/user-lists',
            icon: '',
            subMenuCollapse: true,
            submenu: []
          },
          {
            title: 'Add New',
            path: '/investor/add-lists',
            icon: '',
            subMenuCollapse: true,
            submenu: []
          },
          // {
          //   title: 'Account Security',
          //   path: '/page-under-construction',
          //   icon: '',
          //   subMenuCollapse: true,
          //   submenu: []
          // }
        ]
      }
    ]
  },
  // {
  //   title: 'Commission',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-money-bill-alt',
  //   subMenuCollapse: true,
  //   submenu: [
  //     {
  //       title: 'List',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     }
  //   ]
  // },
  {
    title: 'Pages Category',
    path: '/page-category',
    icon: 'fas fa-file-alt',
    subMenuCollapse: true,
    submenu: [
      {
        title: 'View',
        path: '/page-category/lists',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },
      {
        title: 'Add New',
        path: '/page-category/create',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      }
    ]
  },
  {
    title: 'Pages',
    path: '/page-under-construction',
    icon: 'fas fa-file-alt',
    subMenuCollapse: true,
    submenu: [
      {
        title: 'View',
        path: '/page/lists',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },
      {
        title: 'Add New',
        path: '/page/create',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      }
    ]
  },
  {
    title: 'Menus',
    path: '/page-under-construction',
    icon: 'fas fa-folder-open',
    subMenuCollapse: true,
    submenu: [
      // {
      //   title: 'View',
      //   path: '/menu/view',
      //   icon: '',
      //   subMenuCollapse: true,
      //   submenu: []
      // },
      {
        title: 'Menu',
        path: '/menu/create',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },
      {
        title: 'Menu Item',
        path: '/menu-item/view',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      }
    ]
  },
  // {
  //   title: 'Menu Item',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-folder-open',
  //   subMenuCollapse: true,
  //   submenu: [
  //     {
  //       title: 'View',
  //       path: '/menu-item/view',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Add New',
  //       path: '/menu-item/create',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     }
  //   ]
  // },
  {
    title: 'Locale',
    path: '/locale',
    icon: 'fas fa-map-marker-alt',
    subMenuCollapse: true,
    submenu: [
      // {
      //   title: 'View',
      //   path: '/menu/view',
      //   icon: '',
      //   subMenuCollapse: true,
      //   submenu: []
      // },
      {
        title: 'Add New',
        path: '/locale/create',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },
      {
        title: 'List',
        path: '/locale/view',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      }
    ]
  },
  {
    title: 'Translation',
    path: '/translation/list',
    icon: 'fas fa-globe',
    subMenuCollapse: true,
    submenu: []
  },
  {
    title: 'Company',
    path: '/page-under-construction',
    icon: 'fas fa-building',
    subMenuCollapse: true,
    submenu: [
      {
        title: 'View',
        path: '/company/lists',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },
      // {
      //   title: 'Issue Stock',
      //   path: '/page-under-construction',
      //   icon: '',
      //   subMenuCollapse: true,
      //   submenu: []
      // }
    ]
  },
  {
    title: 'Market',
    path: '/page-under-construction',
    icon: 'fas fa-building',
    subMenuCollapse: true,
    submenu: [
      {
        title: 'Symbol',
        path: '/markets/symbol',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },
      {
        title: 'Markets',
        path: '/markets/list',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },

    ]
  },
  {
    title: 'Email Templates',
    path: '/page-under-construction',
    icon: 'fas fa-envelope-open',
    subMenuCollapse: true,
    submenu: [
      {
        title: 'List',
        path: '/mail-template/list',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },
      {
        title: 'Add Template',
        path: '/mail-template/create',
        icon: '',
        subMenuCollapse: true,
        submenu: []
      },

    ]
  },
  // {
  //   title: 'Transaction',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-exchange-alt',
  //   subMenuCollapse: true,
  //   submenu: []
  // },
  // {
  //   title: 'Messaging',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-comments',
  //   subMenuCollapse: true,
  //   submenu: []
  // },
  // {
  //   title: 'Order Book',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-chart-bar',
  //   subMenuCollapse: true,
  //   submenu: []
  // },
  // {
  //   title: 'Ticket System',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-ticket-alt',
  //   subMenuCollapse: true,
  //   submenu: []
  // },
  // {
  //   title: 'Newsletter',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-at',
  //   subMenuCollapse: true,
  //   submenu: []
  // },
  // {
  //   title: 'Email Templates',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-envelope',
  //   subMenuCollapse: true,
  //   submenu: [
  //     {
  //       title: 'Dashboard',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Configure Template',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   title: 'Game Robots',
  //   path: '/page-under-construction',
  //   icon: 'fab fa-android',
  //   subMenuCollapse: true,
  //   submenu: []
  // },
  // {
  //   title: 'Game Markets',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-rocket',
  //   subMenuCollapse: true,
  //   submenu: [
  //     {
  //       title: 'User',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: [
  //         {
  //           title: 'List',
  //           path: '/page-under-construction',
  //           icon: '',
  //           subMenuCollapse: true,
  //           submenu: []
  //         },
  //         {
  //           title: 'Logins',
  //           path: '/page-under-construction',
  //           icon: '',
  //           subMenuCollapse: true,
  //           submenu: []
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Company',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: [
  //         {
  //           title: 'View',
  //           path: '/page-under-construction',
  //           icon: '',
  //           subMenuCollapse: true,
  //           submenu: []
  //         },
  //         {
  //           title: 'Issue Stock',
  //           path: '/page-under-construction',
  //           icon: '',
  //           subMenuCollapse: true,
  //           submenu: []
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: 'Help Center',
  //   path: '/page-under-construction',
  //   icon: 'fas fa-question-circle',
  //   subMenuCollapse: true,
  //   submenu: [
  //     {
  //       title: 'Documentation',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Approving Users',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Code Documentation',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Best Practice',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Disable a Company',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Migration',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Software Information',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'HYBSE API',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     },
  //     {
  //       title: 'Change Log',
  //       path: '/page-under-construction',
  //       icon: '',
  //       subMenuCollapse: true,
  //       submenu: []
  //     }
  //   ]
  // }
  {
    title: 'Activity Logs',
    path: '/activity-logs',
    icon: 'fas fa-file-alt',
    subMenuCollapse: true,
    submenu: []
  }
];
