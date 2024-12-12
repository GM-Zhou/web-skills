const VIP_FREE = 0b01;
const PAID = 0b10;

const VIP = 0b01;
const VIP_AND_PAID = 0b11;

const getModalType = (...types) => {
	let modalType = 0;
	for (const type of types) modalType |= type;
	return modalType;
};

const type = getModalType(VIP_FREE, PAID);

console.log('type :>> ', type === VIP_AND_PAID);
