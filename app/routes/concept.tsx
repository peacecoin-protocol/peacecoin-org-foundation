import { useTranslation } from 'react-i18next'
import i18next from '@/i18next.server'
import type { Route } from './+types/concept'
import { SectionTitle } from '@/components/composite/section-title'

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request, 'concept')
  const title = t('title')
  return { title }
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.title }]
}

export const handle = {
  i18n: ['common', 'concept'],
}

export default function Concept() {
  const { t } = useTranslation('concept')
  return (
    <main>
      <section>
        <SectionTitle subtitle="Concept">
          コミュニティの共助を引出すために
        </SectionTitle>
        <p>
          コミュニティの活動は共助の力で成り立っています。しかし、行動を起こしても金銭的価値につながりにくいため、
          <br />
          長続きせずに終わりがちです。ボランタリーなコミュニティであっても、最終的には資本主義的な問題にぶつかり、
          <br />
          資本が集まるところに決定権も集まります。これによりコミュニティ内の流動性や活力が損なわれます。コミュニティ通貨は、地域社会など様々なコミュニティ内での共助や貢献を可視化し、
          <br />
          評価する手段を提供します。
        </p>

        <h2>
          通常のお金では測れない
          <br />
          ソーシャルキャピタルの価値を表現することが可能に
        </h2>
        <p>
          具体的にはPEACE COINではARIGATO
          CREATIONというアルゴリズムにより、コミュニティ内での流通を促進します。
          <br />
          また、コミュニティ通貨はガバナンスのツールとしても機能し、
          <br />
          消費と投票が一致する形でメンバーが直接的な影響を及ぼせるようになります。
        </p>
        <p>
          しかし、こういった通貨をゼロから作るのは大変です。
          <br />
          PEACE
          COINは、ソーシャルキャピタルをコミュニティ通貨によってデジタル資産化するためのプラットフォームです。
          <br />
          コミュニティ内のソーシャルキャピタルを可視化し、コミュニティ内での貢献や相互支援を促します。
          <br />
          ユーザーは、お互いのソーシャルキャピタルを評価することにより、コミュニティ内外での価値交換を促進することができます。
        </p>
        <p>
          PEACE
          COINはまた、透明性と公平性をもたらす新たなガバナンスモデルを提案し、
          <br />
          全ての参加者がコミュニティの発展に対して実質的な影響力を持つことを目指しています。
        </p>
      </section>

      <section className="bg-primary/7 rounded-md p-[4.5rem]">
        <h1>ARIGATO CREATIONとは</h1>
        <div className="md:flex">
          <div className="md:flex-1">
            <h3>
              価値提供者への支払いをすることで
              <br />
              増大するPEACE COIN独自のnアルゴリズムです
            </h3>
            <p>
              使用されないトークンを減少させることによりトークンの流通速度が増し、トークンを使用するインセンティブが高まることで、経済活動の活性化を促進します。
            </p>
            <p>
              増大・減少するトークンを使うことにより、個人間だけでなく、企業や家庭、地域社会といった幅広いコミュニティの経済活性が起こるだけでなく、ソーシャルキャピタルやアンペイドワークと呼ばれるボランティアや家事労働などの、
              「まだ評価されていない価値」の可視化・価値化・流動化を実現します。
            </p>
          </div>
          <div className="md:flex-1">
            <img
              src="/assets/images/concept/what-is-arigato-creation.png"
              width="836"
              height="940"
              alt="ARIGATO CREATIONとは"
            />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle subtitle="Vision and Goals">
          多様性を認め合える、豊かな社会をつくる
        </SectionTitle>
        <img
          src="/assets/images/concept/concept.gif"
          width="2400"
          height="588"
          alt="感謝が循環する社会"
          className="w-full h-auto block max-md:hidden"
        />
        <video
          className="w-full h-auto block aspect-square md:hidden"
          loop
          muted
          playsInline
          autoPlay
          width="580"
          height="580"
        >
          <source
            src="/assets/images/concept/concept_mobile.mp4"
            type="video/mp4"
          />
        </video>
        <p>
          PEACE COIN（ピースコイン）プラットフォームが目指す「豊かな」社会とは、
          <br />
          多様な価値が循環している社会です。
        </p>
        <p>
          それぞれの個人やコミュニティが持つ独自の貢献や価値を認め合い循環させることが、
          <br />
          社会の持続可能性を高めることにつながります。
          <br />
          この共通認識は、経済的な豊かさに加え、精神的なゆとりや生きがいをもたらします。
          <br />
          PEACE COINのアルゴリズムによって、
          <br />
          バランス（調和）の取れた稼ぎ方・使い方を実現する新たな経済活動の形態を提案します。
        </p>

        <h2>
          PEACE COINによる新しい価値観は、
          <br />
          貯蓄よりも共助と繋がりを重視するアプローチです
        </h2>

        <p>
          PEACE
          COINは、ただ貯めることに焦点を当てるのではなく、使うことの価値と意味を再定義します。
          <br />
          貯蓄が増えても実は不安は減らないという、これまでの資本主義社会とは異なり、
          <br />
          共助や貢献を促進しコミュニティと繋がることによって、その不安を逆に減少させることができます。
          <br />
          この逆説的なアプローチは、人々が従来の金銭的な価値観だけではなく、
          <br />
          より深い人間関係や社会的な繋がりの重要性を体験するきっかけを提供します。
        </p>

        <h2>
          PEACE COINは、
          <br />
          人々の社会貢献的な行動を再評価します
        </h2>
        <p>
          PEACE
          COINを受け取るサービス提供者は、従来のコストパフォーマンス重視から、
          <br />
          持続可能なサービスや目の前の人を大切にする価値観へとシフトします。
          <br />
          これにより、利他的な行動が促進され、供給者としての役割が再評価されます。{' '}
          <br />
          PEACE
          COINを多く支払うことで、人間関係や信頼が深まり、社会的な繋がりが強化されます。
          <br />
          これらの行動は、経済活動を一歩進め、
          <br />
          より充実したコミュニティ形成を促進しようという想いがPEACE
          COINの根底にあります。
        </p>
      </section>
    </main>
  )
}
