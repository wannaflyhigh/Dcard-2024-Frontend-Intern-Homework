import React, { useEffect, useState } from "react"
import { Button, IconButton, Menu, MenuItem } from "@mui/material"
import { useGithubAuth } from "../context/GithubAuthContext"

function LoggedinComponent() {
	const githubAuth = useGithubAuth()
	const [anchorEl, setAnchorEl] = React.useState(null)

	function handleMenu(event) {
		setAnchorEl(event.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	function logout() {
		githubAuth.setIsLogin(false)
		githubAuth.setAccessToken(null)
		localStorage.removeItem("access_token")
	}

	return (
		<>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<div>hi</div>
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={logout}>Log out</MenuItem>
			</Menu>
		</>
	)
}

function NotLoggedinComponent() {
	return (
		<Button
			color="inherit"
			href={`https://github.com/login/oauth/authorize?client_id=${VITE_CLIENT_ID}&redirect_uri=${location.href}`}
		>
			Login to Github
		</Button>
	)
}

export default function Login() {
	const auth = useGithubAuth()

	return auth.isLogin ? <LoggedinComponent /> : <NotLoggedinComponent />
}
