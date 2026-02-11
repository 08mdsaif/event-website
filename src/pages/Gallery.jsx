const media = [
  { title: 'Opening Ceremony', type: 'Photo', src: 'https://picsum.photos/seed/event1/400/250' },
  { title: 'Hackathon Floor', type: 'Photo', src: 'https://picsum.photos/seed/event2/400/250' },
  { title: 'Dance Performance', type: 'Photo', src: 'https://picsum.photos/seed/event3/400/250' },
  { title: 'Aftermovie Teaser', type: 'Video', src: 'https://picsum.photos/seed/event4/400/250' },
];

export default function Gallery() {
  return (
    <section className="page">
      <h1>Photo & Video Gallery</h1>
      <p>Use this page to showcase event highlights and improve visual impact.</p>

      <div className="grid cards">
        {media.map((item) => (
          <article className="card" key={item.title}>
            <img src={item.src} alt={item.title} className="gallery-image" />
            <h3>{item.title}</h3>
            <p>{item.type}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
