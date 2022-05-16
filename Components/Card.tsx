import { Box, Icon, Text, Image, Flex, AspectRatio } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function Card({
	item,
	handleLike,
	handleUnLike,
	setClick,
	likedPosts,
}) {
	return (
		<Box m={5} shadow={"lg"} borderRadius={15} bg={"white"} maxW={"550px"}>
			{item.media_type === "image" ? (
				<Image
					onClick={() => {
						window.open(item.url, "_blank");
					}}
					alt={item.title}
					src={item.hdurl || item.url}
				/>
			) : (
				<AspectRatio maxW={"550px"}>
					<iframe src={item.url} title={item.title} />
				</AspectRatio>
			)}
			<Box p={5}>
				<Flex justifyContent={"space-between"} alignItems={"center"}>
					<Text fontWeight={"bold"} fontSize={"2xl"}>
						{item.copyright || "Anonymous"}
					</Text>
					{likedPosts.some((likedPost) => likedPost.date === item.date) ? (
						<Icon
							boxSize={"6"}
							color={"red"}
							onClick={() => {
								handleUnLike(item);
								setClick(false);
							}}
							as={AiFillHeart}
						/>
					) : (
						<Icon
							boxSize={"6"}
							onClick={() => {
								handleLike(item);
								setClick(true);
							}}
							as={AiOutlineHeart}
						/>
					)}
				</Flex>
				<Text fontSize={"lg"}>{item.title}</Text>
				<Text color={"gray.600"}>{item.date}</Text>
				<Text>{item.explanation}</Text>
			</Box>
		</Box>
	);
}
