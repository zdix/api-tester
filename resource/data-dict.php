<?

$waybill = [
    'id' => 'ID',
    'user_id' => '发单用户ID',
    'source_id' => '来源ID',
    'source_type' => '来源类型',
    'sn' => '流水号',
    'from_user_id' => '发件人ID',
    'from_user_address_id' => '发件人地址ID',
    'from_company_id' => '发件公司ID',
    'from_company_name' => '发件公司名称',
    'from_name' => '发件人姓名',
    'from_phone' => '发件人手机号',
    'from_province' => '发件人省',
    'from_city' => '发件人市',
    'from_county' => '发件人区县',
    'from_address' => '发件人地址',
    'from_longitude' => '发件地址经度',
    'from_latitude' => '发件地址纬度',
    'to_user_id' => '收件人ID',
    'to_user_address_id' => '收件人地址ID',
    'to_company_id' => '收件公司ID',
    'to_company_name' => '收件公司名称',
    'to_name' => '收件人姓名',
    'to_phone' => '收件人手机号',
    'to_province' => '收件人省',
    'to_city' => '收件人市',
    'to_county' => '收件人区',
    'to_address' => '收件人地址',
    'to_longitude' => '收件地址经度',
    'to_latitude' => '收件地址纬度',
    'content' => '物品内容',
    'comment' => '备注',
    'package' => '包装类型',
    'amount' => '件数',
    'insure' => '是否保价',
    'insure_declare_value' => '声明价值',
    'insure_charge' => '保价费',
    'charge' => '运费',
    'charge_pay_type' => '运费支付类型',
    'charge_paid' => '已支付运费',
    'cod' => '代收货款',
    'cod_account_data' => '代收货款',
    'cod_received' => '代收货款已收款',
    'cod_paid' => '代收货款已付款',
    'receive_courier_id' => '取件快递员ID',
    'receive_confirm_user' => '用户是否确认取件成功',
    'receive_confirm_courier' => '快递员是否确认取件成功',
    'deliver_type' => '派件类型',
    'deliver_courier_id' => '派件快递员ID',
    'deliver_confirm_user' => '用户是否确认派件成功',
    'deliver_confirm_courier' => '快递员是否确认派件成功',
    'flag' => '标志位属性',
    'route_id' => '路线ID',
    'transport_id' => '运次ID',
    'express_org_id' => '快递公司ID',
    'express_waybill_id' => '快递公司运单号',
    'data' => '其它数据JSON',
    'status' => '状态',
    'weight' => '权重',
    'create_time' => '创建时间',
    'update_time' => '更新时间',
];


$charge_pay_type = [
    0 => '寄方付',
    1 => '收方付'
];
$deliver_type = [
    0 => '自提',
    1 => '送货'
];







$transport = [
    'id' => 'ID',
    'schedule_id' => '班次ID',
    'start_hour' => '发车时间-小时',
    'start_minute' => '发车时间-分钟',
    'route_id' => '线路ID',
    'courier_id' => '司机ID',
    'status' => '状态',
    'create_time' => '创建时间',
    'update_time' => '更新时间',
];
