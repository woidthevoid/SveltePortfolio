<script lang="ts">
	// @ts-ignore
	import profile from '$lib/assets/me.JPG';
	import { GraduationCap, User, MapPin, Briefcase } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';
	import { reveal } from '$lib/actions/reveal';

	/* listContent represents data used for the about me section with titles, icons and content */
	const listContent = [
		{ icon: User, title: m.hero_name(), content: 'Victor Woydowski Dralle' },
		{
			icon: GraduationCap,
			title: m.hero_education(),
			content: m.hero_eduname()
		},
		{ icon: Briefcase, title: m.hero_experience(), content: m.hero_experience_content() },
		{ icon: MapPin, title: m.hero_location(), content: m.hero_location_name() }
	];
	const teckStack = [{ title: 'React' }, { title: 'Kubernetes' }];
</script>

<!--About section-->
<section use:reveal={{ delay: 200 }} id="about" aria-labelledby="about-heading" class="px-4 py-16 sm:px-8">
	<h2 id="about-heading" class="mb-8 flex items-center gap-4 text-3xl font-extrabold">
		{m.nav_about()}
		<span class="h-px flex-1 bg-base-content/20" role="none"></span>
	</h2>

	<div class="mx-auto max-w-7xl">
		<!--Gradient border frame: padding reveals the gradient, colored shadow adds the glow halo-->
		<div
			class="rounded-3xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-2xl shadow-primary/40"
		>
			<div class="rounded-[calc(1.5rem-2px)] bg-base-100 px-6 py-8 sm:px-10 sm:py-10">
				<div class="w-full flex flex-col items-center gap-8 sm:flex-row sm:items-start">
					<div class="flex w-full shrink-0 flex-col items-center gap-6 sm:w-auto sm:items-start">
						<!--Picture with tilting effect when hovered over, divs enable interactivity-->
						<div class="hover-3d shrink-0" role="img" aria-label="Portræt af Victor Woydowski Dralle">
							<figure class="w-56 rounded-2xl">
								<img src={profile} alt="" class="h-full w-full rounded-full object-cover" />
							</figure>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>

						<ul class="w-52 self-start space-y-3 text-sm" aria-label="Fakta om Victor">
							{#each listContent as { icon: Icon, content, title } (title)}
								<li>
									<div class="flex flex-col gap-2 ">
										<Icon size={16} aria-hidden="true" class="shrink-0 text-primary"></Icon>
										<span class="font-semibold">{title}</span>
									</div>
									<p>{content}</p>
								</li>
							{/each}
						</ul>
					</div>

					<div class="flex flex-1 flex-col gap-4 text-base leading-relaxed">
						<p>{@html m.about_intro()}</p>
						<p>{m.about_passion()}</p>
						<p>{m.about_hobbies()}</p>

						<div class="flex flex-row gap-4">
							{#each teckStack as tech (tech.title)}
								<div class="badge badge-primary">
									{tech.title}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
