const handleResize = () => {
  const slider = sliderRef.current;
  const sliderContainer = sliderContainerRef.current;
  if (slider && sliderContainer) {
    const visibleItems = Number(
      getComputedStyle(slider).getPropertyValue("--slider-items")
    );
    setTotalSliderVisibleItems(visibleItems);
    setTotalSlidableItems(sliderContainer.childElementCount - visibleItems);
    moveSliderItem();
  }
};
