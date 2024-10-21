<template>
    <div>
      <div 
        ref="resizableDiv" 
        :style="{ height: divHeight + 'px' }" 
        class="absolute bottom-0 w-full bg-black border-t border-white rounded-t-3xl overflow-auto cursor-ns-resize py-5 px-4"
        @mousedown="startResize"
        @touchstart="startResize"
      >
        Resizable Div
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const divHeight = ref(window.innerHeight * 0.6); 
  
  const startResize = (event) => {
    event.preventDefault(); 
  
    // Set initial position depending on event type (mouse or touch)
    let initialY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
  
    // Mouse or touch move event to handle resizing
    const resizeHandler = (e) => {
      const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
      const deltaY = initialY - currentY; // Reverse calculation to shrink or expand from the top
  
      // Calculate the new height
      const newHeight = divHeight.value + deltaY;
  
      // Set new height, ensuring the minimum height is 60vh
      divHeight.value = Math.max(window.innerHeight * 0.6, newHeight);
  
      // Update initialY to the current position
      initialY = currentY;
    };
  
    // Stop resizing when the user releases the mouse or touch
    const stopResize = () => {
      window.removeEventListener('mousemove', resizeHandler);
      window.removeEventListener('touchmove', resizeHandler);
      window.removeEventListener('mouseup', stopResize);
      window.removeEventListener('touchend', stopResize);
    };
  
    // Attach event listeners for resizing
    window.addEventListener('mousemove', resizeHandler);
    window.addEventListener('touchmove', resizeHandler);
    window.addEventListener('mouseup', stopResize);
    window.addEventListener('touchend', stopResize);
  };
  </script>
  
  <style scoped>
  .resizable-div {
    width: 100%;
    transition: height 0.3s ease;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    user-select: none;
  }
  </style>
  