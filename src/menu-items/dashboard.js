// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Home3, HomeTrendUp, Box1, Book, Profile2User, ShoppingBag, UserSquare, KyberNetwork } from 'iconsax-react';

import { useGetMenu } from 'api/menu';
import { groupBy } from 'lodash';

const icons = {
  dashboard: HomeTrendUp,
  components: Box1,
  loading: Home3,
  analytics: Book,
  authors: Profile2User,
  promoCode: ShoppingBag,
  users: UserSquare,
  others: KyberNetwork
};

const loadingMenu = {
  id: 'group-dashboard-loading',
  title: '',
  type: 'group',
  icon: icons.loading,
  children: [
    {
      id: 'defaultdashboard',
      title: 'Dashboard',//word displaying  while loading
      type: 'item',
      url: '/dashboard/defaultdashboard',
      icon: icons.dashboard
    },
    {
      id: 'stories',
      title: 'Stories',
      type: 'item',
      url: '/dashboard/stories',
      icon: icons.analytics
    },
    {
      id: 'authors',
      title: 'Authors',
      type: 'item',
      url: '/dashboard/authors',
      icon: icons.authors
    },
    {
      id: 'narrators',
      title: 'Narrators',
      type: 'item',
      url: '/dashboard/narrators',
      icon: icons.authors
    },
    
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/dashboard/users',
      icon: icons.users
    },
    {
      id: 'others',
      title: 'Others',
      type: 'item',
      url: '/dashboard/others',
      icon: icons.others
    }
  ]
};

// ==============================|| MENU ITEMS - API ||============================== //

export const MenuFromAPI = () => {
  const { menu, menuLoading } = useGetMenu();

  if (menuLoading) return loadingMenu;

  // Extract dashboard children and make them top-level items
  const dashboardChildren = menu?.children?.find(item => item.id === 'dashboard')?.children || [];
  console.log('API Dashboard Children:', dashboardChildren);

  const subChildrenList = (children) => {
    return children?.map((subList) => {
      return fillItem(subList);
    });
  };

  const itemList = (subList) => {
    let list = fillItem(subList);

    if (subList.type === 'collapse') {
      list.children = subChildrenList(subList.children);
    }
    return list;
  };

  // Convert dashboard children to top-level items
  const childrenList = dashboardChildren.map((subList) => {
    const filledItem = fillItem(subList);
    return { ...filledItem, type: 'item' };
  });

  let menuList = {
    ...menu,
    title: '', // 
    children: childrenList
  };

  return menuList;
};

function fillItem(item, children) {
  console.log("item:", item)
  // console.log("children:", children)
  let iconName = item?.icon;

  if (item.id === "default") {
    iconName = "dashboard";
  }
  if (item.id === "analytics") {
    iconName = "analytics";
  }
  if (item.id === "authors") {
    iconName = "authors";
  }
  if (item.id === "promoCode") {
    iconName = "promoCode";
  }
  if (item.id === "users") {
    iconName = "users";
  }
  console.log("iconName:", iconName)


  const icon = icons[iconName];
  return {
    ...item,
    title: <FormattedMessage id={`${item?.title}`} />,
    icon: icon,
    ...(children && { children })
  };
}

