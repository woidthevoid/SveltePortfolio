<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { reveal } from '$lib/actions/reveal';
	import airplate from '$lib/assets/airplate.png';
	import type { Component } from 'svelte';
	import {
		SiReact,
		SiTypescript,
		SiTailwindcss,
		SiExpress,
		SiMysql,
		SiGithubactions,
		SiFirebase,
		SiStripe,
		SiPostman,
		SiJest,
		SiDigitalocean
	} from '@icons-pack/svelte-simple-icons';

	const techIcons: Record<string, Component<{ size?: number; color?: string; title?: string }>> = {
		React: SiReact,
		TypeScript: SiTypescript,
		Tailwind: SiTailwindcss,
		Express: SiExpress,
		MySQL: SiMysql,
		'GitHub Actions': SiGithubactions,
		Firebase: SiFirebase,
		Postman: SiPostman,
		Stripe: SiStripe,
		Jest: SiJest,
		DigitalOcean: SiDigitalocean
	};

	const experienceTitle: string[] = JSON.parse(m.experience_title());
	const experiencePeriod: string[] = JSON.parse(m.experience_period());
	const experienceSummary: string[] = JSON.parse(m.experience_summary());
	const experiences = [
		{
			logo: airplate,
			role: experienceTitle[0],
			company: 'AirPlate',
			period: experiencePeriod[0],
			summary: experienceSummary[0],
			tech: [
				'React',
				'TypeScript',
				'Tailwind',
				'Express',
				'MySQL',
				'GitHub Actions',
				'Jest',
				'DigitalOcean'
			]
		},
		{
			logo: airplate,
			role: experienceTitle[1],
			company: 'AirPlate',
			period: experiencePeriod[1],
			summary: experienceSummary[1],
			tech: ['React', 'TypeScript', 'Tailwind', 'Express', 'Firebase', 'Stripe', 'Postman']
		}
	];
</script>

<section id="experience" aria-labelledby="experience-heading" class="px-4 py-16 sm:px-8">
	<h2
		use:reveal
		id="experience-heading"
		class="mb-10 flex items-center gap-4 text-3xl font-extrabold"
	>
		{m.nav_experience()}
		<span class="h-px flex-1 bg-base-content/20" role="none"></span>
	</h2>

	<ul class="mx-auto flex max-w-4xl flex-col gap-6" aria-label={m.nav_experience()}>
		{#each experiences as { logo, role, company, period, summary, tech }, i (role)}
			<li
				use:reveal={{ delay: i * 150 }}
				class="group rounded-2xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg shadow-primary/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40"
			>
				<article class="flex h-full flex-col gap-4 rounded-[calc(1rem-2px)] bg-base-100 p-5 sm:p-6">
					<header class="flex items-center gap-4">
						<img
							src={logo}
							alt={`${company} logo`}
							width="120"
							height="120"
							loading="lazy"
							class="h-30 w-30 shrink-0 rounded-lg object-contain"
						/>
						<div class="min-w-0 flex-1">
							<h3 class="text-lg font-bold sm:text-xl">{role}</h3>
							<p class="text-sm text-base-content/70">{company}</p>
							<p class="text-xs text-base-content/50">{period}</p>
						</div>
					</header>

					<p class="text-sm leading-relaxed text-base-content/80">{summary}</p>

					<div>{m.experience_tech_badges()}</div>
					<ul class="mt-auto flex flex-wrap gap-2" aria-label={`Technologies used at ${company}`}>
						{#each tech as t (t)}
							{@const Icon = techIcons[t]}
							<li
								class="tooltip grid h-10 w-10 place-items-center rounded-full bg-base-200 text-base-content/80 transition-colors hover:bg-primary hover:text-primary-content"
								data-tip={t}
							>
								{#if Icon}
									<Icon size={20} title={t} />
								{:else}
									<span class="text-xs font-bold" aria-label={t}>{t.slice(0, 2)}</span>
								{/if}
							</li>
						{/each}
					</ul>
				</article>
			</li>
		{/each}
	</ul>
</section>
