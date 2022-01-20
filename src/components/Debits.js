import {useState} from "react";

function Debits(props) {
    const [newItemCost, setNewItemCost] = useState(null)
    const [newItemName, setNewItemName] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        props.setDebitInfo((prev) => {
            prev.push({
                description: newItemName,
                amount: newItemCost,
                date: Date()
            })
            return prev
        })

        e.target[0].value = ""
        e.target[1].value = ""
        props.setAccountBalance(prev => prev - newItemCost)
        setNewItemCost("")
        setNewItemName("")
    }

    return (
        <div>
            <h1>
                Debit
            </h1>
            <h2>Current Account Balance: {props.accountBalance}</h2>
            <div id="column-for-debit">
                {props.debitInfo != null &&
                    <div id="debit-list-column">
                        {props.debitInfo.map((item) => {
                            return (
                                <div className="debits">
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

                        <input type="submit" value="Add Debit"/>
                    </form>
                </div>

            </div>
        </div>

    )
}

export default Debits;