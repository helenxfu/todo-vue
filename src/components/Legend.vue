<template>
  <div class="legend">
    <div class="legendColumn">
      <div class="legendKey">
        <div class="box circle priorityLow"></div>
        <p>{{$t('table.priorityLow')}}</p>
      </div>
      <div class="legendKey">
        <div class="box circle priorityMid"></div>
        <p>{{$t('table.priorityMid')}}</p>
      </div>
      <div class="legendKey">
        <div class="box circle priorityHigh"></div>
        <p>{{$t('table.priorityHigh')}}</p>
      </div>
    </div>
    <div class="legendColumn">
      <div class="legendKey">
        <div class="box completed"></div>
        <p>{{$t('text.completed')}}</p>
      </div>
      <div class="legendKey">
        <div class="box passed"></div>
        <p>{{$t("text.passed")}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// check out styled-components when you can, I hope you love it as much as I do
// https://github.com/styled-components/vue-styled-components

// import styled from 'vue-styled-components';

// Create a <StyledTitle> Vue component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
// const StyledTitle = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
//  /* you can do all your scss in here as well as interpolate values */
//   &.active{
//     border-bottom: 2px solid ${myFavouriteBlue};
//   }
// `;
// you can access properties on the styled component like this ${props=>props.disabled ? 'red' : 'blue'}
// you can even return styled components from a function:
// const getLegendStyles = (paddingLeft) => styled.div`
//   padding-left: ${paddingLeft}px;
// `

// colocation of related code means you don't need to travel far, and when you delete a file, all the relevant code goes with it (no need to search around)
// when the components grow in size, I put them in a folder and import/export the styles like /components/Legend.vue imports its styles from /components/LegendStyles.js

// Create a <Wrapper> Vue component that renders a <section> with
// some padding and a papayawhip background
// const Wrapper = styled.section`
//   padding: 4em;
//   background: papayawhip;
// `;

// Use them like any other Vue component – except they're styled!
// <wrapper>
//   <styled-title>Hello World, this is my first styled component!</styled-title>
// </wrapper>

export default {
  name: "Legend"
};
</script>