/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Special Burger',
    description: 'Juicy beef patty with fresh crisp lettuce, red tomatoes, melted cheese, and secret sauce on a toasted artisan bun.',
    price: 350,
    category: 'Burgers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNT29Z2-zGLRAG6vfw061O87BkzzcLky2pDAvLRH-payZJk_aOYPdBzS_IPSOW6J1dDk_2-Sk3M9QuV20Yg2JQV6f-ad7fF9q73vA_EcgVhHeQa-_ABZa53JB4C09VB0kTvx7iTCFwoU4OTZ7aNOwMFdmdDt3tJntU3q1hZ6fB5WO-cPZFvw824u-iUMxEzvBPrd01OsRyqiXOnmn9YpM6dDfjA8DHFTIFSa-X-tvgKFa6RDdZ6Yb711VWOvRBjIZQVzFriF_DI4x7',
    inStock: true,
  },
  {
    id: 'item-2',
    name: 'Doro Wat',
    description: 'Traditional Ethiopian spicy chicken stew rich in deep red berbere sauce, featuring tender chicken pieces and a whole hard-boiled egg.',
    price: 450,
    category: 'Traditional',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIVLsKpvi8zbT4AYC8mb4v0ZJ05lkRp3PqmRmlzS9KUL34FUVjWKkM5qKymlAMVnssKVxJdbg4ssHQoxr1vWAvISnKHy9hHretlJtelp7HNG8oj6TGPumtoq2muD0GTPrXRvO-VDLPuby3v9atDCH_Y5rZCjTWFbFZFEtzvApn_GWZ_5Uco03CK6HxBardV5bLyBLPAnF9JYcemcnuqxFFWjw5jFf7geC6Tb8x9_EB67-l9KADZMymtI40xrSeuMtrQnwFysgqM5RJ',
    inStock: true,
  },
  {
    id: 'item-3',
    name: 'French Fries',
    description: 'Crispy golden hand-cut potatoes served with a side of ketchup.',
    price: 120,
    category: 'Sides',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDFKzFVcsAsdvk-iXR4V94zCeIjMiKHccP_aTUGWOwDHtQF6j9QqoT0VcXa7WYzxRzu1dChMZMkv6-_TqwdlB2k8L0o7vkkRp2GX4wTsMsAO_KFg4fwLC_RgfRBxfTm4rxuFWYMas9CsSiJ71cgm03H3bewzxxsb30HvlzoYZsRoU1yfrNI5Z_XzSjfvhMHInRTSGE8lQeuBITEWNqq7RIYLywKjF1egF_lGSAJLxbkqq8_7P-c9hMvh6XEszZV4NYgkgGR1HgYDbr',
    inStock: true,
  },
  {
    id: 'item-4',
    name: 'Tej (Honey Wine)',
    description: 'Homemade traditional fermented honey wine glowing warmly under crisp lighting.',
    price: 200,
    category: 'Soft Drinks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk-574_5UBzxujAdFS_Y2uqzCBbcnzYpW96Eu5dPvrlnJIVyTBMpFFqdnpUvcCVweZYgYA8dR7Msf9LVRQ0lxLFxXNPifTKCD2IVTfLghfn5UaC1pFMng2nc6-R06NQeMPQyPp4pk_YWCvCjRutjBB3yZO73NB-fXSMLQSXUJ_t8tpOOJN_022iQPvrfw_4-rfXRZjkNbhG6IG9gshxLuIi12FWv6D5MS66aJ4SkQU4xat9IKABXUKiocGlTUEM6BNFPVqe1bHnHr8',
    inStock: true,
  },
  {
    id: 'item-5',
    name: 'Mediterranean Salad',
    description: 'A vibrant mix of fresh salad bowl with crisp greens, feta cheese, olives, and a light vinaigrette.',
    price: 250,
    category: 'Sides',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7vIyy4IXk_b_0PZbUoDRAChYQLYcrKwqRUsHWmlMLpoDWJeK2ArByIAhTKkChevGIqDD39p_8khtru0V5KuATjDo_bACyyeoJ32nfi9PdAglbqIQ9Wm6977C8weNod0rUxpRbFxqIqfPS0NmQvdLnxrCo-KFXFXgSAysX4uYnrm4Rg69nSFzcNLC90WeZvxkxyYInvpxxVBr5fnqRdqWoJJCiNWdW2hiYGnD1Qm4CML8o9eTiJPR90GeaOsuXT2Y8qP6J8N91ye7Y',
    inStock: true,
  },
  {
    id: 'item-6',
    name: 'Roasted Veggie Quinoa Bowl',
    description: 'A hearty quinoa and roasted vegetable grain bowl focusing on freshness and texture.',
    price: 320,
    category: 'Sides',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVjUh8xF3DjuKJaEDBcoA_tVUjSrL2h3WaIqMJzCUCBFfkwmvI8gT8RNbmN-eXWPISSWLRGeFbsx254KRJYFI5kWSDZdqrm7GY9dIah3erSNxTZhvBIHSG2IPe2rBZSeR4aFMtqiEQMkJsPj7q9eLwtopvoDI_SestPkjDAREO_Pz3wdTD67tPZCcRi9oOwwaJah9ahAmvUosN_eHjHMSUrVqYyyrLtthrJ9frCVqeFcSbGxbLKfcYLukxP41Em_wN_QvMZOb2exS2',
    inStock: true,
  },
  {
    id: 'item-7',
    name: 'Iced Hibiscus Tea',
    description: 'Chilled hibiscus flower herbal tea infusion, slightly sweetened and served ice-cold.',
    price: 80,
    category: 'Soft Drinks',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=400',
    inStock: false,
  }
];

export const ALL_CATEGORIES = ['Burgers', 'Traditional', 'Sides', 'Soft Drinks'];

export const DEFAULT_PAYMENT_CONFIG = {
  telebirr: '0911XXXXXX',
  cbeBankAccount: '1000XXXXXXXXX',
};
