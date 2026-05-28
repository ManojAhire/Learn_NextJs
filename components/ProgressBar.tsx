'use client'

import { useEffect } from 'react'

export default function ProgressBar() {
  useEffect(() => {
    const bar = document.getElementById('progressBar')
    const sidebar = document.getElementById('sidebar')
    const toggle = document.getElementById('sidebarToggle')

    // Scroll progress
    const onScroll = () => {
      if (!bar) return
      const h = document.documentElement
      bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%'
    }
    window.addEventListener('scroll', onScroll)

    // Active nav highlight
    const sections = document.querySelectorAll<HTMLElement>('[id]')
    const navItems = document.querySelectorAll<HTMLAnchorElement>('.nav-item')
    const secObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navItems.forEach((n) => n.classList.remove('active'))
            const link = document.querySelector<HTMLAnchorElement>(`.nav-item[href="#${e.target.id}"]`)
            if (link) link.classList.add('active')
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sections.forEach((s) => secObs.observe(s))

    // Fade-in observer
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fi').forEach((el) => obs.observe(el))

    // Mobile sidebar toggle
    toggle?.addEventListener('click', () => sidebar?.classList.toggle('open'))
    navItems.forEach((n) => n.addEventListener('click', () => sidebar?.classList.remove('open')))

    return () => {
      window.removeEventListener('scroll', onScroll)
      secObs.disconnect()
      obs.disconnect()
    }
  }, [])

  return <div id="progressBar" aria-hidden="true" />
}
