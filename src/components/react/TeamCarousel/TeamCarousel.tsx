import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TeamMembers } from '@/data/team/team';

import { TeamCard } from './TeamCard/TeamCard';

import classes from './TeamCarousel.module.css';

export function TeamCarousel() {
  return (
    <div className={classes.TeamCarousel}>
      <Swiper
        modules={[FreeMode]}
        freeMode
        slidesPerView={1.75}
        slidesOffsetAfter={16}
        slidesOffsetBefore={16}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesOffsetAfter: 24,
            slidesOffsetBefore: 24,
          },
          768: {
            slidesOffsetAfter: 24,
            slidesOffsetBefore: 24,
            slidesPerView: 2.75,
          },
          1024: {
            slidesOffsetAfter: 24,
            slidesOffsetBefore: 24,
            slidesPerView: 3.75,
          },
        }}
      >
        {TeamMembers.map(member => (
          <SwiperSlide key={member.name}>
            <TeamCard {...member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
