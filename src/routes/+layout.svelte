<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeSwap from './ThemeSwap.svelte';
	import {onMount} from 'svelte';

	let { children } = $props();
	let activeSelection = $state('');
	const links = [
		{ href: '#about', label: 'Om Mig' },
		{ href: '#experience', label: 'Erfaring' },
		{ href: '#projects', label: 'Projekter' },
		{ href: '#contacts', label: 'Kontakt' }
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSelection = entry.target.id;
					}
				}
			},
			{ threshold: 0.5 }
		);

		document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header id="header">
	<div id="navbar" class="navbar bg-base-200 sticky top-0 z-50">
		<div class="navbar-start">
			<span class="font-semibold">Victor Woydowski Dralle</span>
		</div>

		<div class="navbar-center">
			<div class="flex flex-row  space-between">
			{#each links as link(link.href)}
				<a class="btn btn-sm rounded-full text-lg" href={link.href}
				class:button-active={activeSelection === link.href.slice(1)}>{link.label}</a>
			{/each}
			</div>
		</div>

		<div class="navbar-end">
			<ThemeSwap />
		</div>

	</div>
</header>

<main>
	{@render children()}
</main>

<footer id="footer" class="footer footer-horizontal footer-center bg-primary text-primary-content">
	<p class="font-bold">Victor Woydowski Dralle</p>
	<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
</footer>