<template>
    <div id="table">
        <table class="border-collapse border border-slate-200 text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="font-normal">
                <tr class="text-[13px] bg-slate-100">
                    <th class="px-2 border border-slate-300 hover:bg-slate-200"><input
                            class="cursor-pointer w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500  ring-offset-gray-800 focus:ring-2"
                            type="checkbox" :checked="isAllSelected" @click="selectAllPesertas"></th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('no_kewajiban')">
                        No. Kewajiban
                    </th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('no_polisi')">No.
                        Polisi</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('pemilik')">
                        Pemilik</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('peserta')">
                        Peserta</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('nomor_va')">
                        Nomor VA</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200"
                        @click="sortList('harga_terbentuj')">Harga Terbentuk
                        (VA)</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('admin_ex_ppn')">
                        Biaya Admin ex PPN</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('ppn')">Ppn</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('total')">Total
                    </th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200"
                        @click="sortList('tanggal_lelang')">Tanggal Lelang
                    </th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200"
                        @click="sortList('tanggal_jatuh_tempo')">Tanggal
                        Jatuh Tempo</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200"
                        @click="sortList('tanggal_lunas')">Tanggal Lunas</th>
                    <th class="border border-slate-300 cursor-pointer hover:bg-slate-200" @click="sortList('status')">Status
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white text-[13px] hover:bg-slate-50" v-for="(peserta, index) in paginated" :key="index">
                    <td class="py-2 px-2 cursor-pointer text-gray-900 whitespace-nowrap border border-slate-300">
                        <input
                            class=" w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500  ring-offset-gray-800 focus:ring-2"
                            type="checkbox" v-model="selectedPesertaIds" :value="peserta.id">

                    </td>
                    <td v-if="peserta.no_kewajiban" class="py-2 px-2 border border-slate-300">
                        {{ peserta.no_kewajiban }}
                    </td>
                    <td class="py-2 px-2 border border-slate-300">
                        {{ peserta.no_polisi }}
                    </td>
                    <td class="py-2 px-2 border border-slate-300">
                        {{ peserta.pemilik }}
                    </td>
                    <td class="py-2 px-2 border border-slate-300">
                        {{ peserta.peserta }}
                    </td>
                    <td v-if="peserta.nomor_va" class="py-2 px-2 border border-slate-300">
                        {{ peserta.nomor_va }}
                    </td>
                    <td v-else class="py-2 px-2 border border-slate-300 text-center">
                        -
                    </td>
                    <td v-if="peserta.harga_terbentuk" class="py-2 px-2 border border-slate-300">
                        {{ formatRupiah(peserta.harga_terbentuk) }}
                    </td>
                    <td v-else class="py-2 px-2 border border-slate-300">
                        Rp 0
                    </td>
                    <td v-if="peserta.admin_ex_ppn" class="py-2 px-2 border border-slate-300">
                        {{ formatRupiah(peserta.admin_ex_ppn) }}
                    </td>
                    <td v-else class="py-2 px-2 border border-slate-300">
                        Rp 0
                    </td>
                    <td v-if="peserta.ppn" class="py-2 px-2 border border-slate-300">
                        {{ formatRupiah(peserta.ppn) }}
                    </td>
                    <td class="py-2 px-2 border border-slate-300">
                        Rp 0
                    </td>
                    <td v-if="peserta.total" class="py-2 px-2 border border-slate-300">
                        {{ formatRupiah(peserta.total) }}
                    </td>
                    <td v-else class="py-2 px-2 border border-slate-300">
                        Rp 0
                    </td>
                    <td class="py-2 px-2 border border-slate-300">
                        {{ peserta.tanggal_lelang }}
                    </td>
                    <td class="py-2 px-2 border border-slate-300">
                        {{ peserta.tanggal_jatuh_tempo }}
                    </td>
                    <td class="py-2 px-2 border border-slate-300">
                        {{ peserta.tanggal_lunas }}
                    </td>
                    <td class="py-2 px-2 border border-slate-300">
                        {{ peserta.status }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <h4 class="text-slate-500 my-2 ">Item Terpilih {{ selectedPesertaIds.length }}</h4>
    <div class=" grid grid-cols-6 items-center w-fit gap-2">
        <h3 class=" text-slate-600 text-sm text-start">Jumlah Data Per Halaman</h3>
        <select id="countries" v-model="pagination.rowsPerPage"
        class="text-start my-2 p-1 mr-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    </div>
</template>

<script>
import { counter } from '@fortawesome/fontawesome-svg-core';

export default {
    props: ['datas'],
    data() {
        return {
            pesertas: this.datas,
            isAllSelected: false,
            selectedPesertaIds: [],
            sortedData: [],
            sortedbyASC: true,
            pagination: {
                page: 1,
                total: 0,
                rowsPerPage: 3
            }
        }
    },
    mounted() {
        this.sortedData = this.pesertas;
        this.pagination.total = this.pesertas.length
    },
    watch: {
        selectedPesertaIds() {
            if (this.selectedPesertaIds.length !== this.pesertas.length) {
                this.isAllSelected = false
                this.$emit('clickedsingle', this.selectedPesertaIds);
            } else {
                this.isAllSelected = true
            }
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.pagination.total / this.pagination.rowsPerPage)
        },
        paginated() {
            var clone = JSON.parse(JSON.stringify(this.pesertas));
            var startFrom = (this.pagination.page * this.pagination.rowsPerPage) - this.pagination.rowsPerPage;
            return clone.splice(startFrom, this.pagination.rowsPerPage);
        }
    },
    methods: {
        onPageChange(event) {
            console.log(event)
        },
        sortList(sortBy) {
            if (this.sortedbyASC) {
                this.sortedData.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
                this.sortedbyASC = false;
            } else {
                this.sortedData.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
                this.sortedbyASC = true;
            }
        },
        selectAllPesertas() {
            if (this.isAllSelected) {
                this.selectedPesertaIds = []
                this.isAllSelected = false
            } else {
                this.selectedPesertaIds = []
                for (var peserta in this.pesertas) {
                    this.selectedPesertaIds.push(this.pesertas[peserta].id)
                }
                this.isAllSelected = true
                this.$emit('clicked', this.selectedPesertaIds);
            }
        },
        formatRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }
    },



}
</script>