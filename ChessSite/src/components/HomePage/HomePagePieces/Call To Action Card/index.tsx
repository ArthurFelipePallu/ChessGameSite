
import { type CallToActionCardDto ,CALL_TO_ACTION_CARDS } from "../../../../models/Site Layout/CallToActionCardDto"
import { history } from "../../../../utils/history";

type Prop = {
  cardInfo : CallToActionCardDto;
}

function CallToActionCard({cardInfo}: Prop) {

    function gotToSiteDir()
    {
        history.push(cardInfo.siteDir)
    }
  return (
    <div className="rounded-xl border p-6 hover:shadow-lg transition"
          onClick={gotToSiteDir}>
      <h3 className="text-xl font-semibold mb-2">{cardInfo.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{cardInfo.description}</p>
    </div>
  )
}


function createActionCard(card : CallToActionCardDto){
    return (
        <CallToActionCard
            key={card.id}
            cardInfo={card}
        />
    );
}


export function ActionCards() {


  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {CALL_TO_ACTION_CARDS.map(card => (
        createActionCard(card)
      ))}
    </div>
  )
}