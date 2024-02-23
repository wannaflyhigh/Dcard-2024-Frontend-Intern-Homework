import Express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import axios from "axios";
dotenv.config()
const app = Express()

app.use(cors())
app.use(Express.json());

app.get('/', (req, res) => {
	res.send("hi")
})

app.get('/codeExchageAuthToken', async (req, res) => {
	const { code } = req.query
	const { CLIENT_ID: client_id, CLIENT_SECRET: client_secret } = process.env
	if (!code) { return res.status(400).json({ msg: "Missing parameter" }) }
	const headers = {
		'Accept': 'application/json',
	};
	const response = await axios.post('https://github.com/login/oauth/access_token', {
		client_id,
		client_secret,
		code,
	}, { headers })
	console.log(response.data)
	res.json(response.data)
})

app.listen(3000)

console.log("App is running on port 3000")
