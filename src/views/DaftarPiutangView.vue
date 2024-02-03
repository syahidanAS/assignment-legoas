<template>
    <div class="mt-10">
        <Breadcumb />
    </div>

    <div class="grid bg-white p-8 my-4 rounded ">
        <div id="head-title" class="md:flex md:justify-between rounded-md sm:grid sm:grid-cols-1 mb-4">
            <div class="grid grid-cols-2 items-center gap-2">
                <h1 class="text-xl text-slate-700 font-bold">PIUTANG UNIT</h1>
            </div>

            <div class="grid grid-cols-3 gap-2 sm:mt-4 md:mt-0">
                <Button
                    class="bg-white border-2 border-blue-600 p-2 rounded text-sm text-blue-600 hover:bg-blue-600 hover:text-white"
                    @click="populateData()">
                    REFRESH
                </Button>
                <button
                    class="bg-white border-2 border-blue-600 p-2 rounded text-sm text-blue-600 hover:bg-blue-600 hover:text-white"
                    @click="exportToExcel()">
                    EXPORT
                </button>
                <button
                    class="bg-white border-2 border-blue-600 p-2 rounded text-sm text-blue-600 hover:bg-blue-600 hover:text-white"
                    @click="payment()">
                    BAYAR
                </button>
                <button
                    :class="showAdvancedFilter ? 'bg-blue-600 border-2 border-blue-600 p-2 rounded text-sm text-white justify-end w-full col-span-4 font-vold' : 'bg-white border-2 border-blue-600 p-2 rounded text-sm text-blue-600 hover:bg-blue-600 hover:text-white justify-end w-full col-span-4 font-vold'"
                    v-on:click="showAdvancedFilter = !showAdvancedFilter">
                    <span v-if="showAdvancedFilter">CLOSE</span>
                    <span v-else>FILTER</span>
                </button>
                <div class="grid absolute bg-slate-100 rounded-md shadow shadow-slate-300 p-4 h-fit w-fit mt-14 ml-4 left-1/3 z-30"
                    v-if="showAdvancedFilter">
                    <div class="w-full">
                        <table class="my-6">
                            <tr>
                                <td class="py-4">Harga Terbentuk</td>
                                <td>:</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="number" placeholder="Nilai Minimum" v-model="harga_terbentuk_minimum">
                                </td>
                                <td>s/d</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="number" placeholder="Nilai Maksimum" v-model="harga_terbentuk_maksimum">
                                </td>
                                <td>
                                    <button class="bg-blue-600 p-2 text-white rounded-md ml-2"
                                        @click="submit">Filter</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-4">Biaya Admin ex PPN</td>
                                <td>:</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="number" placeholder="Nilai Minimum" v-model="admin_ex_ppn_minimum">
                                </td>
                                <td>s/d</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="number" placeholder="Nilai Maksimum" v-model="admin_ex_ppn_maksimum">
                                </td>
                                <td>
                                    <button class="bg-blue-600 p-2 text-white rounded-md ml-2"
                                        @click="submitAdminExPpn">Filter</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-4">PPN</td>
                                <td>:</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="number" placeholder="Nilai Minimum" v-model="ppn_minimum">
                                </td>
                                <td>s/d</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="number" placeholder="Nilai Maksimum" v-model="ppn_maksimum">
                                </td>
                                <td>
                                    <button class="bg-blue-600 p-2 text-white rounded-md ml-2"
                                        @click="submitAdminExPpn">Filter</button>
                                </td>
                            </tr>
                            <tr class="">
                                <td class="py-4">Total</td>
                                <td>:</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="number" placeholder="Nilai Minimum" v-model="total_minimum">
                                </td>
                                <td>s/d</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="number" placeholder="Nilai Maksimum" v-model="total_maksimum">
                                </td>
                                <td>
                                    <button class="bg-blue-600 p-2 text-white rounded-md ml-2"
                                        @click="submitTotal">Filter</button>
                                </td>
                            </tr>
                        </table>
                        <hr>
                        <table class="my-6">
                            <tr>
                                <td class="py-4">Tanggal Lelang</td>
                                <td>:</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="date" placeholder="Nilai Minimum" v-model="tanggal_lelang_minimum">
                                </td>
                                <td>s/d</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="date" placeholder="Nilai Maksimum" v-model="tanggal_lelang_maksimum">
                                </td>
                                <td>
                                    <button class="bg-blue-600 p-2 text-white rounded-md ml-2"
                                        @click="submitTanggalLelang">Filter</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-4">Tanggal Jatuh Tempo</td>
                                <td>:</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="date" placeholder="Nilai Minimum" v-model="tanggal_jatuh_tempo_minimum">
                                </td>
                                <td>s/d</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="date" placeholder="Nilai Maksimum" v-model="tanggal_jatuh_tempo_maksimum">
                                </td>
                                <td>
                                    <button class="bg-blue-600 p-2 text-white rounded-md ml-2"
                                        @click="submitTanggalJatuhTempo">Filter</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-4">Tanggal Lunas</td>
                                <td>:</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="date" placeholder="Nilai Minimum" v-model="tanggal_lunas_minimum">
                                </td>
                                <td>s/d</td>
                                <td>
                                    <input
                                        class="p-1 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-300 "
                                        type="date" placeholder="Nilai Maksimum" v-model="tanggal_lunas_maksimum">
                                </td>
                                <td>
                                    <button class="bg-blue-600 p-2 text-white rounded-md ml-2"
                                        @click="submitTanggalLunas">Filter</button>
                                </td>
                            </tr>
                        </table>
                        <hr>
                        <div class="w-full">
                            <table class="w-full">
                                <tr>
                                    <td class="py-4">Status</td>
                                    <td>:</td>
                                    <td class="text-end px-1" v-for="(item, index) in status" :key="index">
                                        <input type="checkbox" class="mr-2" :value="item.id" v-model="selection">{{
                                            item.desc }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <TableSkeleton v-if="isLoading" />
        <Table v-else v-bind:datas="datas" @clicked="handleChildClick" @clickedsingle="handleChildClickSingle" />
        <div class="bg-white p-4 rounded-md w-full" v-if="showCart">
            <h2 class="text-xl my-4 border-b-2">Rincian Pembayaran</h2>
            <table class="border-collapse border border-slate-500 w-full">
                <tr>
                    <th class="p-2 border-collapse border border-slate-500">Peserta</th>
                    <th class="p-2 border-collapse border border-slate-500">Total</th>
                </tr>
                <tr v-for="(item, index) in cart" :key="index">
                    <td class="p-2 border-collapse border border-slate-500">{{ item[0].peserta }}</td>
                    <td class="p-2 border-collapse border border-slate-500">{{ formatRupiah(item[0].total) }}</td>
                </tr>
                <tr class="bg-slate-200">
                    <td class="p-2 border-collapse border border-slate-500">
                        <strong>Grand Total</strong>
                    </td>
                    <td class="p-2 border-collapse border border-slate-500">
                        <strong>
                            {{ formatRupiah(grandTotal) }}
                        </strong>
                    </td>
                </tr>
            </table>
        </div>

    </div>
</template>

<script >
import Breadcumb from '@/components/Breadcumb.vue';
import pesertaDatas from '../utils/data.js';
import columns from '../utils/column.js';
import Table from '@/components/Table.vue';
import TableSkeleton from '@/components/TableSkeleton.vue';
import exportFromJSON from "export-from-json";


export default {
    name: 'DaftarPiutangView',
    components: {
        Breadcumb,
        Table,
        TableSkeleton
    },
    data() {
        return {
            datas: [],
            filteredDatas: [],
            columns: columns,
            showAdvancedFilter: false,
            isLoading: true,
            choosedForpayment: [],
            cart: [],
            showCart: false,
            grandTotal: null,
            pageSize: 10,
            harga_terbentuk_minimum: 0,
            harga_terbentuk_maksimum: 0,
            admin_ex_ppn_minimum: 0,
            admin_ex_ppn_maksimum: 0,
            ppn_minimum: 0,
            ppn_maksimum: 0,
            total_minimum: 0,
            total_maksimum: 0,
            tanggal_lelang_minimum: '',
            tanggal_lelang_maksimum: '',
            tanggal_jatuh_tempo_minimum: '',
            tanggal_jatuh_tempo_maksimum: '',
            tanggal_lunas_minimum: '',
            tanggal_lunas_maksimum: '',
            status: [
                {
                    id: 'KONFIRMASI PEMBAYARAN',
                    desc: 'Konfirmasi Pembayaran',
                },
                {
                    id: 'PROSES PEMBAYARAN',
                    desc: 'Proses Pembayaran'
                },
                {
                    id: 'LUNAS',
                    desc: 'Lunas'
                }
            ],
            selection: [],
            filtered: [],
        }
    },
    watch: {
        selection() {
            this.populateData();
            if (this.selection.length > 0) {
                let handler1 = this.selection[0];
                let handler2 = this.selection[1];
                let handler3 = this.selection[2];
                let newArray = this.datas.filter(function (ele) {
                    return ele.status === handler1 || ele.status === handler2 || ele.status === handler3;
                })
                this.populateData(newArray)
                console.log(newArray)
            } else {
                this.populateData();
            }
        }
    },
    methods: {
        submit() {
            const harga_filtered = this.datas.filter(hargas =>
                (hargas.harga_terbentuk >= this.harga_terbentuk_minimum && hargas.harga_terbentuk <= this.harga_terbentuk_maksimum), 0
            );
            this.populateData(harga_filtered)
        },
        submitAdminExPpn() {
            const harga_filtered = this.datas.filter(hargas =>
                (hargas.admin_ex_ppn >= this.admin_ex_ppn_minimum && hargas.admin_ex_ppn <= this.admin_ex_ppn_maksimum), 0
            );
            this.populateData(harga_filtered)
        },
        submitPpn() {
            const submit_ppn = this.datas.filter(hargas =>
                (hargas.ppn >= this.ppn_minimum && hargas.ppn <= this.ppn_maksimum), 0
            );
            this.populateData(submit_ppn)
        },
        submitTotal() {
            const submit_total = this.datas.filter(hargas =>
                (hargas.total >= this.total_minimum && hargas.total <= this.total_maksimum), 0
            );
            this.populateData(submit_total)
        },
        submitTanggalLelang() {
            const lelang_minimum = new Date(this.tanggal_lelang_minimum).getTime()
            const lelang_maksimum = new Date(this.tanggal_lelang_maksimum).getTime();

            const submit_tanggal_lelang = this.datas.filter(tanggals =>
                (new Date(tanggals.tanggal_lelang).getTime() >= lelang_minimum && new Date(tanggals.tanggal_lelang).getTime() <= lelang_maksimum)
            );

            this.populateData(submit_tanggal_lelang)
        },
        submitTanggalJatuhTempo() {
            const jatuh_tempo_minimum = new Date(this.tanggal_jatuh_tempo_minimum).getTime()
            const jatuh_tempo_maksimum = new Date(this.tanggal_jatuh_tempo_maksimum).getTime();

            const submit_tanggal_lelang = this.datas.filter(tanggals =>
                (new Date(tanggals.tanggal_jatuh_tempo).getTime() >= jatuh_tempo_minimum && new Date(tanggals.tanggal_jatuh_tempo).getTime() <= jatuh_tempo_maksimum)
            );

            this.populateData(submit_tanggal_lelang)
        },

        submitTanggalLunas() {
            const tanggal_lunas_minimum = new Date(this.tanggal_lunas_minimum).getTime()
            const tanggal_lunas_maksimum = new Date(this.tanggal_lunas_maksimum).getTime();

            const submit_tanggal_lelang = this.datas.filter(tanggals =>
                (new Date(tanggals.tanggal_lunas).getTime() >= tanggal_lunas_minimum && new Date(tanggals.tanggal_lunas).getTime() <= tanggal_lunas_maksimum)
            );

            this.populateData(submit_tanggal_lelang)
        },
        getListByBinding(value, index, array) {
            const pesertas = this.datas;
            const resultJson = pesertas.filter(element => {
                return element.status == value
            })
            this.populateData(resultJson);
        },

        showFilterBox() {
            this.showAdvancedFilter = this.showAdvancedFilter ? true : false
        },
        loading() {
            this.isLoading = true;
            setTimeout(() => this.isLoading = false, 2000)
        },
        populateData(value) {
            this.datas = []
            this.showCart = false;
            this.cart = [];
            if (pesertaDatas.length <= 0) {
                this.isLoading = true
                alert('Cannot fetching data')
            } else {
                this.loading();
                if (value) {
                    this.datas = value;
                } else {
                    this.datas = pesertaDatas;
                }

            }
        },
        //Solusi terbaik adalah export dari sisi server
        exportToExcel() {
            const data = this.datas;
            const fileName = "peserta-lelang";
            const exportType = exportFromJSON.types.xls;
            if (data) exportFromJSON({ data, fileName, exportType });
        },
        formatRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        },
        handleChildClick(data) {
            this.choosedForpayment = data;
        },
        handleChildClickSingle(data) {
            this.choosedForpayment = data;
        },
        payment() {
            let items = this.choosedForpayment;
            if (items.length <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Centang minimal 1 data!",
                });
            } else {
                items.map(this.proceed)
            }
        },
        proceed(value, index, array) {
            const pesertas = this.datas;
            const resultJson = pesertas.filter(element => {
                return element.id == value
            })
            this.cart.push(resultJson);
            Swal.fire({
                title: "Anda yakin ingin melakukan pembayaran?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Lanjutkan",
                cancelButtonText: "Batalkan"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "berhasil!",
                        text: "Pembayaran berhasil!",
                        icon: "success"
                    });
                    this.showCart = true;
                }
            });
            this.generateTotal();
        },
        generateTotal() {
            let sum = 0;
            this.cart.forEach(function (item) {
                sum += item[0].total;
            });
            this.grandTotal = sum;
        }
    },
    created() {
        this.populateData();
    },
    computed: {
        sortedData: function () {
            return this.datas.sort(function (a, b) {
                return a.name > b.name;
            });
        }
    }


}

</script>