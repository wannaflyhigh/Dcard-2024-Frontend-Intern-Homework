import React, { useEffect } from "react"

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
		<a
			href={`https://github.com/login/oauth/authorize?client_id=${VITE_CLIENT_ID}&redirect_uri=${location.href}`}
		>
			login to Github
		</a>
	)
}
