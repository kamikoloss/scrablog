<script setup>
import {
  headerNavTypes,
  sidebarTypes,
  defaultRecentArticlesMax,
} from '~/scrablog.const';

const appConfig = useAppConfig()

const { data: articles } = await useAsyncData('default', () => {
  return whereNotInTitle(queryContent()).sort({ created: -1 }).find()
})
const { data: allArticles } = await useAsyncData('default-all', () => {
  return queryContent().find()
})

const articlesYearMonth = getArticlesGroupByYearMonth(articles.value)
const yearKeys = Object.keys(articlesYearMonth.year).sort((a, b) => b - a)
const monthKeys = Object.keys(articlesYearMonth.month).sort((a, b) => b - a)

const maxWidthClass = appConfig.showSidebar ? 'max-w-7xl' : 'max-w-3xl'
</script>

<template>
  <div class="min-h-screen text-text-base bg-bg-base">
    <!-- ヘッダー -->
    <header>
      <div class="bg-bg-content py-16">
        <div class="w-full mx-auto px-8 lg:px-16" :class="maxWidthClass">
          <!-- タイトル -->
          <h1 class="font-bold text-2xl my-2">
            <NuxtLink to="/">{{ appConfig.blogTitle }}</NuxtLink>
          </h1>
          <!-- 説明文 -->
          <p v-if="appConfig.headerText" class="my-2">{{ appConfig.headerText }}</p>
          <!-- ヘッダーナビゲーション -->
          <div v-if="appConfig.showHeaderNav" class="flex gap-x-4 my-2">
            <span v-for="headerNav of appConfig.headerNavContents">
              <!-- ARTICLE: 特定の記事へのリンク -->
              <span v-if="headerNav.type === headerNavTypes.ARTICLE">
                <NuxtLink :to="`/${allArticles.find(a => a.title === headerNav.title)?.id}`" class="text-text-link">
                  {{ headerNav.label }}
                </NuxtLink>
              </span>
              <!-- INTERNAL_LINK: 内部リンク -->
              <span v-if="headerNav.type === headerNavTypes.INTERNAL_LINK">
                <NuxtLink :to="headerNav.to" class="text-text-link">
                  {{ headerNav.label }}
                </NuxtLink>
              </span>
              <!-- EXTERNAL_LINK: 外部リンク -->
              <span v-if="headerNav.type === headerNavTypes.EXTERNAL_LINK">
                <NuxtLink :to="headerNav.to" target="_blank" class="underline text-text-link">
                  {{ headerNav.label }}
                </NuxtLink>
              </span>
              <!-- ALL_ARTICLES: 全記事一覧 -->
              <span v-if="headerNav.type === headerNavTypes.ALL_ARTICLES">
                <NuxtLink to="/articles" class="text-text-link">
                  {{ headerNav.label }}
                </NuxtLink>
              </span>
              <!-- ALL_IMAGES: 全画像一覧 -->
              <span v-if="headerNav.type === headerNavTypes.ALL_IMAGES">
                <NuxtLink to="/images" class="text-text-link">
                  {{ headerNav.label }}
                </NuxtLink>
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
    <!-- メイン -->
    <main>
      <div
        class="
          w-full flex flex-wrap items-start gap-x-16 mx-auto 
          lg:px-8 lg:flex-nowrap
        "
        :class="maxWidthClass"
      >
        <!-- 本体 -->
        <div class="w-full">
          <slot />
        </div>
        <!-- サイドバー -->
        <div
          v-if="appConfig.showSidebar"
          class="
            w-full text-sm bg-bg-content mb-32 px-8
            lg:mt-32 lg:max-w-[320px]
          "
        >
          <div v-for="sidebar of appConfig.sidebarContents">
            <!-- ARTICLE: 特定の記事 -->
            <div v-if="sidebar.type === sidebarTypes.ARTICLE" class="my-16">
              <h2 class="text-base font-bold my-2">{{ sidebar.label }}</h2>
              <Lines :lines="allArticles.find(a => a.title === sidebar.title)?.lines" />
            </div>
            <!-- RECENT_ARTICLES: 最近の記事 -->
            <div v-if="sidebar.type === sidebarTypes.RECENT_ARTICLES" class="my-16">
              <h2 class="text-base font-bold my-2">{{ sidebar.label }}</h2>
              <ul>
                <li v-for="(article, index) in articles" class="my-2">
                  <span v-if="index < (sidebar.max ?? defaultRecentArticlesMax)">
                    <Dot />
                    <NuxtLink :to="`/${article.id}`" class="text-text-link">
                      {{ article.title }}
                    </NuxtLink>
                  </span>
                </li>
              </ul>
            </div>
            <!-- ALL_ARTICLES_YEAR: 年別 -->
            <div v-if="sidebar.type === sidebarTypes.ALL_ARTICLES_YEAR" class="my-16">
              <h2 class="text-base font-bold my-2">{{ sidebar.label }}</h2>
              <ul>
                <li v-for="yearKey of yearKeys" class="my-2">
                  <Dot />
                  <NuxtLink :to="`/years/${yearKey}`" class="text-text-link">
                    <span>{{ yearKey }}</span>
                    <span>&nbsp;</span>
                    <span>({{ articlesYearMonth.year[yearKey].length }})</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <!-- ALL_ARTICLES_MONTH: 月別 -->
            <div v-if="sidebar.type === sidebarTypes.ALL_ARTICLES_MONTH" class="my-16">
              <h2 class="text-base font-bold my-2">{{ sidebar.label }}</h2>
              <ul>
                <li v-for="monthKey of monthKeys" class="my-2">
                  <Dot />
                  <NuxtLink :to="`/months/${monthKey}`" class="text-text-link">
                    <span>{{ monthKey }}</span>
                    <span>&nbsp;</span>
                    <span>({{ articlesYearMonth.month[monthKey].length }})</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <!-- ALL_ARTICLES_YEAR_MONTH: 年月別 -->
            <div v-if="sidebar.type === sidebarTypes.ALL_ARTICLES_YEAR_MONTH" class="my-16">
              <h2 class="text-base font-bold my-2">{{ sidebar.label }}</h2>
              <ul>
                <li v-for="yearKey of yearKeys" class="my-2">
                  <Dot />
                  <NuxtLink :to="`/years/${yearKey}`" class="text-text-link">
                    <span>{{ yearKey }}</span>
                    <span>&nbsp;</span>
                    <span>({{ articlesYearMonth.year[yearKey].length }})</span>
                  </NuxtLink>
                  <ul class="ml-4">
                    <li v-for="monthKey of monthKeys" class="my-2">
                      <span v-if="monthKey.includes(yearKey)">
                        <Dot />
                        <NuxtLink :to="`/months/${monthKey}`" class="text-text-link">
                          <span>{{ monthKey }}</span>
                          <span>&nbsp;</span>
                          <span>({{ articlesYearMonth.month[monthKey].length }})</span>
                        </NuxtLink>
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- サイドバーここまで -->
      </div>
    </main>
    <!-- フッター -->
    <footer>
      <div class="text-center text-sm text-text-light py-4">
        <p v-if="appConfig.footerText" class="my-2">
          {{ appConfig.footerText }}
        </p>
        <p v-if="appConfig.showGeneratedBy" class="my-2">
          <span>Generated by </span>
          <NuxtLink
            to="https://scrapbox.io/product"
            target="_blank"
            class="underline"
          >
            Scrapbox
          </NuxtLink>
          <span> + </span>
          <NuxtLink
            to="https://github.com/kamikoloss/scrablog"
            target="_blank"
            class="underline"
          >
            Scrablog
          </NuxtLink> 
        </p>
      </div>
    </footer>
  </div>
</template>
