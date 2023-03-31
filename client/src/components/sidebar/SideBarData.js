import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as MdIcons  from "react-icons/md"
import * as GiIcons from "react-icons/gi"
import * as FiIcons from "react-icons/fi"

export const SideBarData = [
    {
        title: "Categorie",
        path: "#",
        icon: <IoIcons.IoIosPaper color="black"/>,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
        iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,
        subNav: [
            {
                title: "Pizza 2 pour 1",
                path: "#",
                icon: <GiIcons.GiFullPizza fontSize={"200%"} color="black"/>,
                cName: "sub-nav"
            },
            {
                title: "Pizza seule",
                path: "#",
                icon: <FaIcons.FaPizzaSlice fontSize={"200%"} color="black"/>,
                cName: "sub-nav"
            },
            {
                title: "Nos Assiettes",
                path: "#",
                icon: <RiIcons.RiRestaurant2Fill fontSize={"200%"} color="black"/>
            },
            {
                title: "Nos Combos",
                path: "#",
                icon: <IoIcons.IoIosPaper fontSize={"200%"} color="black"/>
            },
            {
                title: "Nos Pates",
                path: "#",
                icon: <IoIcons.IoIosPaper fontSize={"200%"} color="black"/>
            },
            {
                title: "Nos Poutines",
                path: "#",
                icon: <IoIcons.IoIosPaper fontSize={"200%"} color="black"/>
            },
            {
                title: "Nos Sous-Marins ",
                path: "#",
                icon: <IoIcons.IoIosPaper fontSize={"200%"} color="black"/>
            },
            {
                title: "Nos Salades",
                path: "#",
                icon: <IoIcons.IoIosPaper fontSize={"200%"} color="black"/>
            },
            {
                title: "Nos Casse-Croutes",
                path: "#",
                icon: <IoIcons.IoIosPaper fontSize={"200%"} color="black"/>
            },
          ]
    },
    {
        title: "Menu",
        path: "#",
        icon: <MdIcons.MdRestaurantMenu color="black"/>,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
        iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,
    },
    {
        title: "Panier",
        path: "#",
        icon: <FaIcons.FaShoppingCart color="black"/>,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
        iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,
    },
    {
        title: "S'enregistrer",
        path: "#",
        icon: <IoIcons.IoIosCreate color="black"/>,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
        iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,
    },
    {
        title: "Se connecter",
        path: "#",
        icon: <FiIcons.FiLogIn color="black"/>,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
        iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,
    },
]