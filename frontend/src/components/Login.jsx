import React from "react"

export default function Login() {
	const { VITE_CLIENT_ID } = import.meta.env

	return (
		<a
			href={`https://github.com/login/oauth/authorize?client_id=${VITE_CLIENT_ID}`}
		>
			login to Github
		</a>
	)
}
