import React, { useEffect } from "react"
import { Button } from "@mui/material"

export default function Login() {
	const { VITE_CLIENT_ID, VITE_BACKEND_URL } = import.meta.env

	useEffect(() => {
		const code = new URL(location.href).searchParams.get("code")
		if (code) {
			fetch(VITE_BACKEND_URL + `/codeExchageAuthToken?code=${code}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					localStorage.setItem("access_token", data.access_token)
					location.search = ""
				})
		}
	}, [])

	return (
		<Button
			style={{ color: "black" }}
			href={`https://github.com/login/oauth/authorize?client_id=${VITE_CLIENT_ID}&redirect_uri=${location.href}`}
		>
			Login to Github
		</Button>
	)
}
