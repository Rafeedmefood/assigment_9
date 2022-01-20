import {useState} from "react";

function Credits(props) {
    const [newItemCost, setNewItemCost] = useState(null)
    const [newItemName, setNewItemName] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        props.setCreditInfo((prev) => {
            prev.push({
                description: newItemName,
                amount: newItemCost,
                date: Date()
            })
            return prev
        })

        e.target[0].value = ""
        e.target[1].value = ""
        props.setAccountBalance(prev => prev + parseFloat(newItemCost))
        setNewItemCost(null)
        setNewItemName(null)

    }

    return (
        <div>
            <h1>
                Credit
            </h1>
            <h2>Current Account Balance: {props.accountBalance}</h2>
            <div id="column-for-credit">
                {props.creditInfo != null &&
                    <div id="credit-list-column">
                        {props.creditInfo.map((item) => {
                            return (
                                <div className="credits">
                                    <p className="descriptions">ITEM: {item.description}</p>
                                    <p className="descriptions">COST: ${item.amount}</p>
                                    <p className="descriptions">DOP : {item.date}</p>
                                </div>
                            )
                        })}
                    </div>
                }

                <div className="column-for-add">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Item: <input type="text" onChange={(e) => setNewItemName(e.target.value)}/>
                            Cost: <input type="text" onChange={(e) => setNewItemCost(e.target.value)}/>
                        </label>

                        <input type="submit" value="Add Credit"/>
                    </form>
                </div>

            </div>
        </div>

    )
}

export default Credits;