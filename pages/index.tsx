import type { NextPage } from "next";
import {
	Box,
	Center,
	Flex,
	Icon,
	IconButton,
	Image,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import shootingStar from "../public/shootingStar.json";
import Card from "../Components/Card";
const Home: NextPage = () => {
	const [data, setData] = useState([]);
	const [likedPosts, setLikedPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isClick, setClick] = useState(false);
	console.log(data);
	useEffect(() => {
		setIsLoading(true);
		const likedPost = localStorage.getItem("likedPost");
		if (likedPost) {
			setLikedPosts(JSON.parse(likedPost));
		}
		fetch("/api/apod")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				if (data) {
					setIsLoading(false);
				}
			});
	}, []);

	const handleLike = (post: any) => {
		const likedPost: any = [...likedPosts];
		if (likedPost.includes(post)) {
			const index = likedPost.indexOf(post);
			likedPost.splice(index, 1);
			setLikedPosts(likedPost);
		} else {
			likedPost.push(post);
			setLikedPosts(likedPost);
		}
		localStorage.setItem("likedPost", JSON.stringify(likedPost));
	};

	const handleUnLike = (post: any) => {
		const likedPost: any = [...likedPosts];
		const index = likedPost.indexOf(post);
		likedPost.splice(index, 1);
		setLikedPosts(likedPost);
		localStorage.setItem("likedPost", JSON.stringify(likedPost));
	};

	return isLoading ? (
		<Center h={"100vh"}>
			<Flex
				direction={"column"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Lottie
					loop
					animationData={shootingStar}
					play
					style={{ width: 150, height: 150 }}
				/>
				<Text>
					Fetching from {Math.floor(Math.random() * (100 - 1 + 1)) + 1} light
					years away...
				</Text>
			</Flex>
		</Center>
	) : (
		<Flex alignItems={"center"} direction={"column"} justifyContent={"center"}>
			{data.map((item, index) => (
				<Card
					item={item}
					key={index}
					handleLike={handleLike}
					handleUnLike={handleUnLike}
					setClick={setClick}
					likedPosts={likedPosts}
				/>
			))}
		</Flex>
	);
};

export default Home;
