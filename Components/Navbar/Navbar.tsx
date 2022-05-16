import React, { ReactNode, ReactText } from "react";
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	Icon,
	useColorModeValue,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Avatar,
	Button,
	MenuDivider,
	VStack,
	HStack,
} from "@chakra-ui/react";
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
	FiSearch,
	FiCalendar,
	FiChevronDown,
	FiBell,
} from "react-icons/fi";
import { BsCashStack } from "react-icons/bs";
import { IconType } from "react-icons";
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

interface LinkItemProps {
	name: string;
	icon: IconType;
	href: string;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: "Home", icon: FiHome, href: "/" },
	{ name: "Likes", icon: AiOutlineHeart, href: "/likes" },
];

export default function SideNav({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					Spacestagram
				</Text>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			<Flex h={"90%"} direction={"column"} justifyContent={"space-between"}>
				<Flex direction={"column"}>
					{LinkItems.map((link) => (
						<NavItem href={link.href} key={link.name} icon={link.icon}>
							{link.name}
						</NavItem>
					))}
				</Flex>
			</Flex>
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
}
const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => {
	return (
		<Link
			href={href}
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<a>
				<Flex
					m={2}
					align="center"
					p="3"
					mx="4"
					borderRadius="lg"
					role="group"
					cursor="pointer"
					_hover={{
						bg: "cyan.400",
						color: "white",
					}}
					{...rest}
				>
					{icon && (
						<Icon
							mr="4"
							fontSize="16"
							_groupHover={{
								color: "white",
							}}
							as={icon}
						/>
					)}
					{children}
				</Flex>
			</a>
		</Link>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent="flex-start"
			{...rest}
		>
			<IconButton
				variant="outline"
				onClick={onOpen}
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
				Spacestagram
			</Text>
		</Flex>
	);
};
