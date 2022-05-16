import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	try {
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, "0");
		const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		const yyyy = today.getFullYear();
		const todayDate = yyyy + "-" + mm + "-" + dd;

		const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
		const dd2 = String(thirtyDaysAgo.getDate()).padStart(2, "0");
		const mm2 = String(thirtyDaysAgo.getMonth() + 1).padStart(2, "0"); //January is 0!
		const yyyy2 = thirtyDaysAgo.getFullYear();
		const thirtyDaysAgoDate = yyyy2 + "-" + mm2 + "-" + dd2;

		const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_API_KEY}&start_date=${thirtyDaysAgoDate}&end_date=${todayDate}`;
		const { data } = await axios.get(url);
		res.status(200).json(data.reverse());
	} catch (error) {
		console.log(error);
	}
}
