export const handleActiveClass = (router, path, activeClass = 'active') => {
    const location = router.pathname
    return location === path ? activeClass : ''
}

export const handleScrollToElement = (ref, page) => {
    if(page === 'home'){
        window.location = '/class-details/FAFSA-How-to-get-financial-aid-for-college';
    }
    const mainWrap = document.getElementById(ref)
    mainWrap.scrollIntoView()
  }
